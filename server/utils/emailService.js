const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email credentials not configured in environment variables');
        }

       const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // Prevents cloud firewall blocks
            }
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