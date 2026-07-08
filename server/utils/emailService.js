const axios = require('axios');

const sendEmail = async ({ email, subject, message }) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: process.env.EMAIL_FROM_NAME || 'AI Cold Mail Generator',
          email: process.env.EMAIL_FROM_ADDRESS // must be a verified sender in Brevo
        },
        to: [{ email }],
        subject,
        textContent: message
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        timeout: 10000 // fail fast instead of hanging
      }
    );

    return response.data;
  } catch (error) {
    const detail = error.response?.data || error.message;
    console.error('Brevo email error:', detail);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;