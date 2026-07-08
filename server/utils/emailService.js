const axios = require('axios');

const sendEmail = async (options) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY not configured in environment variables');
    }
    if (!process.env.EMAIL_FROM) {
      throw new Error('EMAIL_FROM not configured in environment variables');
    }

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { email: process.env.EMAIL_FROM, name: 'AI Cold Mail Generator' },
        to: [{ email: options.email }],
        subject: options.subject,
        textContent: options.message,
        htmlContent: `<p>${options.message}</p>`,
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 10000, // 10s — fails fast instead of hanging
      }
    );

    console.log('Email sent successfully:', response.data.messageId);
    return { success: true, message: 'Email sent successfully', messageId: response.data.messageId };
  } catch (error) {
    const detail = error.response?.data?.message || error.message;
    console.error('Email sending error:', detail);
    throw new Error(`Failed to send email: ${detail}`);
  }
};

module.exports = sendEmail;