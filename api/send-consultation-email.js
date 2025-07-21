const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  // For production, use environment variables
  // For development/testing, you can use a service like Ethereal Email or Gmail
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com', // Change this to your SMTP provider
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com', // Your email
      pass: process.env.EMAIL_PASS || 'your-app-password'     // Your app password
    }
  });
};

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map();

// Simple rate limiting function
const checkRateLimit = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per 15 minutes

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const record = rateLimitStore.get(ip);
  
  if (now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
};

// Input sanitization
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000); // Limit length
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (basic validation)
const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{8,20}$/;
  return phoneRegex.test(phone);
};

// Main handler function
const handler = async (req, res) => {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Add CORS headers to response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Only POST requests are accepted.' 
    });
  }

  try {
    // Rate limiting check
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }

    // Parse and validate request body
    const { fullName, email, phoneNumber, investmentAmount, investmentTimeline } = req.body;

    // Server-side validation
    const errors = [];

    if (!fullName || !sanitizeInput(fullName)) {
      errors.push('Full name is required');
    }

    if (!email || !isValidEmail(email)) {
      errors.push('Valid email address is required');
    }

    if (!phoneNumber || !isValidPhone(phoneNumber)) {
      errors.push('Valid phone number is required');
    }

    if (!investmentAmount) {
      errors.push('Investment amount selection is required');
    }

    if (!investmentTimeline) {
      errors.push('Investment timeline selection is required');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: ' + errors.join(', ')
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      fullName: sanitizeInput(fullName),
      email: sanitizeInput(email),
      phoneNumber: sanitizeInput(phoneNumber),
      investmentAmount: sanitizeInput(investmentAmount),
      investmentTimeline: sanitizeInput(investmentTimeline)
    };

    // Create email content
    const emailSubject = `New Book Consultation Request from ${sanitizedData.fullName}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background-color: #002868; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #002868; }
          .value { margin-left: 10px; }
          .footer { background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
          .urgent { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📋 New Bond Investment Consultation Request</h1>
        </div>
        
        <div class="content">
          <div class="urgent">
            <strong>⚡ Priority:</strong> New client consultation request - Please respond within 24 hours
          </div>
          
          <h2>Client Information</h2>
          
          <div class="field">
            <span class="label">👤 Full Name:</span>
            <span class="value">${sanitizedData.fullName}</span>
          </div>
          
          <div class="field">
            <span class="label">📧 Email Address:</span>
            <span class="value">${sanitizedData.email}</span>
          </div>
          
          <div class="field">
            <span class="label">📞 Phone Number:</span>
            <span class="value">${sanitizedData.phoneNumber}</span>
          </div>
          
          <div class="field">
            <span class="label">💰 Investment Amount:</span>
            <span class="value">${sanitizedData.investmentAmount}</span>
          </div>
          
          <div class="field">
            <span class="label">⏰ Investment Timeline:</span>
            <span class="value">${sanitizedData.investmentTimeline}</span>
          </div>
          
          <div class="field">
            <span class="label">📅 Submitted:</span>
            <span class="value">${new Date().toLocaleString('en-AU', { 
              timeZone: 'Australia/Sydney',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short'
            })}</span>
          </div>
          
          <h3>📋 Next Steps</h3>
          <ul>
            <li>Contact the client within 24 hours</li>
            <li>Discuss their bond investment requirements</li>
            <li>Provide personalized bond recommendations</li>
            <li>Schedule a detailed consultation if needed</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>This email was automatically generated from the Rate & Return Connection website consultation form.</p>
          <p>Please do not reply to this email. Contact the client directly using the information provided above.</p>
        </div>
      </body>
      </html>
    `;

    const emailText = `
NEW BOND INVESTMENT CONSULTATION REQUEST
========================================

Client Information:
- Full Name: ${sanitizedData.fullName}
- Email: ${sanitizedData.email}
- Phone: ${sanitizedData.phoneNumber}
- Investment Amount: ${sanitizedData.investmentAmount}
- Investment Timeline: ${sanitizedData.investmentTimeline}
- Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}

PRIORITY: Please contact this client within 24 hours to discuss their bond investment requirements.

Next Steps:
1. Contact the client within 24 hours
2. Discuss their bond investment requirements  
3. Provide personalized bond recommendations
4. Schedule a detailed consultation if needed

---
This email was automatically generated from the Rate & Return Connection website.
    `;

    // Create transporter and send email
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Rate & Return Connection',
        address: process.env.EMAIL_USER || 'noreply@rateandreturn.com'
      },
      to: 'webdzignz@outlook.com',
      replyTo: sanitizedData.email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Consultation request sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error processing consultation request:', error);
    
    // Send error response
    return res.status(500).json({
      success: false,
      message: 'Failed to process consultation request. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = handler;