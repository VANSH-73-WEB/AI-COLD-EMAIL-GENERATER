const axios = require('axios');

// Uses Resend's HTTPS API (port 443) instead of SMTP.
// This avoids Render's SMTP port blocking (25/465/587) on free-tier services,
// and works the same way on any host.
//
// Setup:
// 1. Sign up free at https://resend.com
// 2. Get your API key from the dashboard
// 3. Add RESEND_API_KEY to your Render environment variables
// 4. Use "onboarding@resend.dev" as the sender until you verify your own domain,
//    or verify a domain in Resend and use an address on that domain.

const sendEmail = async (options) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured in environment variables');
    }

    const response = await axios.post(
      'https://api.resend.com/emails',
      {
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<p>${options.message}</p>`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10s — fails fast instead of hanging
      }
    );

    console.log('Email sent successfully:', response.data.id);
    return { success: true, message: 'Email sent successfully', messageId: response.data.id };
  } catch (error) {
    const detail = error.response?.data?.message || error.message;
    console.error('Email sending error:', detail);
    throw new Error(`Failed to send email: ${detail}`);
  }
};

module.exports = sendEmail;