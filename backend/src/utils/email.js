
import getTransporter from "../config/nodemailer.config.js";

export const sendEmail = async (to, subject, html) => {
    await getTransporter().sendMail({
        from: `"LogBook" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
};

export const sendEmailVerificationCode = async (to, code) => {
    await sendEmail(to, `${code} is your verification code`, `
        <div>
        <h1>Your verification code for LogBook is ${code}</h1>
        </div>
        `)
}