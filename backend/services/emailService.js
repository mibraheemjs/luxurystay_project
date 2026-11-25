const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Send Email
const sendEmail = async (to, subject, html) => {
    try {
        const response = await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: to,
            subject: subject,
            html: html
        });

        return {
            success: true,
            data: response
        };

    } catch (error) {
        console.error('Email sending error:', error.message);

        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = sendEmail;