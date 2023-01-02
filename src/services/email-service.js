const sender = require('../config/emailConfig');

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
    //this sendmail is an async function so we have wrap it in try catch and use async await, but as sending email is not immediate so the promise will be resolved in sometime
    sender.sendMail({
        from: mailFrom,  //this from will bealways our mail from which we have configure our smtp, even if we send another mail to this parameter, the mail be sent from our email that we have setup smtp with
        to: mailTo,
        subject: mailSubject,
        text: mailBody
    });
}
 
module.exports = {
    sendBasicEmail
}