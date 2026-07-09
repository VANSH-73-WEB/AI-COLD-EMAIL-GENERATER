// const axios = require('axios');

// const sendEmail = async ({ email, subject, message }) => {
//   try {
//     const response = await axios.post(
//       'https://api.brevo.com/v3/smtp/email',
//       {
//         sender: {
//           name: process.env.EMAIL_FROM_NAME || 'AI Cold Mail Generator',
//           email: process.env.EMAIL_FROM_ADDRESS // must be a verified sender in Brevo
//         },
//         to: [{ email }],
//         subject,
//         textContent: message
//       },
//       {
//         headers: {
//           'api-key': process.env.BREVO_API_KEY,
//           'Content-Type': 'application/json',
//           Accept: 'application/json'
//         },
//         timeout: 10000 // fail fast instead of hanging
//       }
//     );

//     return response.data;
//   } catch (error) {
//     const detail = error.response?.data || error.message;
//     console.error('Brevo email error:', detail);
//     throw new Error('Failed to send email');
//   }
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email credentials not configured in environment variables');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: `<p>${options.message}</p>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return { success: true, message: 'Email sent successfully', messageId: info.messageId };
    } catch (error) {
        console.error('Email sending error:', error.message);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

module.exports = sendEmail;