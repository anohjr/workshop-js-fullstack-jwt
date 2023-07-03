const mailer = require("nodemailer");

const transporter = mailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendResetPasswordMail = async ({ dest, url }) => {
    const mailOptions = {
        from: "brian.boudrioux@wildcodeschool.com", // this is the address from which the email will be sent
        to: dest, // this is the address to which the email will be sent
        subject: "Reset your password",
        text: `Use this link to reset your password : ${url}`, // url will be defined later in our controller
        html: `<p>Use this link to reset your password : <a href=${url}>reset your password</a>`,
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendResetPasswordMail,
};