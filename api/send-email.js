export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, phoneNumber, investmentAmount, investmentTimeline } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !investmentAmount || !investmentTimeline) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create email content
    const emailContent = `
New Bond Investment Consultation Request

Client Details:
- Full Name: ${fullName}
- Email: ${email}
- Phone Number: ${phoneNumber}
- Investment Amount: ${investmentAmount}
- Investment Timeline: ${investmentTimeline}

Submitted at: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}

Please contact this client within 24 hours to discuss their bond investment requirements.
    `.trim();

    // Use a simple email service (you can replace this with your preferred service)
    const emailData = {
      to: 'webdzignz@outlook.com',
      from: 'noreply@rateandreturn.com',
      subject: `New Bond Consultation Request - ${fullName}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    };

    // For now, we'll simulate sending the email
    // In production, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Nodemailer with SMTP
    
    console.log('Email would be sent:', emailData);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return res.status(200).json({ 
      success: true, 
      message: 'Consultation request sent successfully' 
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process consultation request'
    });
  }
}