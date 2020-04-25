const nodeMailer = require('nodemailer')

// this is used for sending emails

const sendMail = (mailConfig) => {
// temporarily using mailtrap service
    const transporter = nodeMailer.createTransport({
        service : 'SendGrid',
        auth : {
            user : process.env.EMAIL_USER,
            pass :  process.env.EMAIL_PASS,
        }
    });

    // sending the email with desrired options

    const mailOptions = {
        from : process.env.EMAIL_FROM,
        to : mailConfig.email,
        subject : mailConfig.subject,
        text : mailConfig.text,
        html : mailConfig.html
        // html : even can send nice html to the one who logged in 
    }

    return transporter.sendMail(mailOptions)
    
}

module.exports = sendMail;