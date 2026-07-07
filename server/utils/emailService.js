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
        await transporter.verify();
console.log("SMTP Connected Successfully");
        console.log('Email sent:', info.response);
        return { success: true, message: 'Email sent successfully', messageId: info.messageId };
    } catch (error) {
    console.error("Full Error:", error);
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Stack:", error.stack);

    throw error;
}
};

module.exports = sendEmail;