# Book Consultation Form - Setup Instructions

## Overview
This document provides step-by-step instructions to set up the book consultation form with email functionality.

## Prerequisites
- Node.js (v16 or higher)
- A Gmail account or other SMTP email service
- Netlify account (for deployment)

## 1. Email Service Setup

### Option A: Gmail (Recommended for testing)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Save this password securely

### Option B: Professional Email Service (Recommended for production)
- **SendGrid**: Sign up at sendgrid.com, get API key
- **Mailgun**: Sign up at mailgun.com, get SMTP credentials
- **AWS SES**: Set up through AWS console

## 2. Environment Variables Setup

### For Local Development:
1. Copy `.env.example` to `.env`
2. Fill in your email credentials:
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=development
```

### For Netlify Deployment:
1. Go to your Netlify site dashboard
2. Navigate to Site settings → Environment variables
3. Add the following variables:
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your email password/API key
   - `NODE_ENV`: production

## 3. Local Testing

### Install Dependencies:
```bash
npm install
```

### Test the Form Locally:
```bash
# Start the development server
npm run dev

# In another terminal, test the email function
curl -X POST http://localhost:8888/.netlify/functions/send-consultation-email \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phoneNumber": "1234567890",
    "investmentAmount": "100000-250000",
    "investmentTimeline": "immediately"
  }'
```

## 4. Deployment to Netlify

### Automatic Deployment:
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy the site

### Manual Deployment:
```bash
# Build the project
npm run build

# Deploy to Netlify (if you have Netlify CLI)
netlify deploy --prod
```

## 5. Form Features

### Security Features Implemented:
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Input sanitization to prevent XSS
- ✅ Server-side validation
- ✅ CORS protection
- ✅ Email format validation
- ✅ Phone number validation

### User Experience Features:
- ✅ Client-side validation with real-time feedback
- ✅ Loading states during submission
- ✅ Success/error message display
- ✅ Form reset after successful submission
- ✅ Mobile-responsive design
- ✅ Professional email formatting

### Email Features:
- ✅ HTML and plain text versions
- ✅ Professional formatting with company branding
- ✅ High priority marking
- ✅ Reply-to set to client's email
- ✅ Timestamp in Australian timezone
- ✅ Clear next steps for follow-up

## 6. Testing Checklist

### Form Display:
- [ ] Form is visible on desktop
- [ ] Form is visible on mobile devices
- [ ] All form fields are properly styled
- [ ] Form is accessible via "Book Consultation" buttons

### Form Validation:
- [ ] Required field validation works
- [ ] Email format validation works
- [ ] Phone number validation works
- [ ] Error messages display correctly
- [ ] Success message displays after submission

### Email Functionality:
- [ ] Emails are received at webdzignz@outlook.com
- [ ] Email subject line is correct
- [ ] All form data is included in email
- [ ] Email formatting is professional
- [ ] Reply-to is set to client's email

### Security:
- [ ] Rate limiting prevents spam
- [ ] Input sanitization works
- [ ] Server-side validation functions
- [ ] No sensitive data exposed in errors

### Performance:
- [ ] Form submission completes within 3 seconds
- [ ] Loading states work correctly
- [ ] Form works in all major browsers

## 7. Troubleshooting

### Common Issues:

**Email not sending:**
- Check environment variables are set correctly
- Verify email credentials
- Check SMTP settings for your provider
- Look at Netlify function logs

**Form not submitting:**
- Check browser console for JavaScript errors
- Verify API endpoint is accessible
- Check network tab for failed requests

**Validation errors:**
- Ensure all required fields are filled
- Check email format is valid
- Verify phone number format

### Debug Mode:
Set `NODE_ENV=development` to see detailed error messages.

## 8. Maintenance

### Regular Tasks:
- Monitor email delivery rates
- Check for spam submissions
- Update dependencies monthly
- Review and update rate limiting rules

### Monitoring:
- Set up email alerts for failed submissions
- Monitor Netlify function logs
- Track form conversion rates

## Support
For technical support or questions about this implementation, refer to the code comments or contact the development team.