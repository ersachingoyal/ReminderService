const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repostitory')

const repo = new TicketRepository();

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
    //this sendmail is an async function so we have wrap it in try catch and use async await, but as sending email is not immediate so the promise will be resolved in sometime
    sender.sendMail({
        from: mailFrom,  //this from will bealways our mail from which we have configure our smtp, even if we send another mail to this parameter, the mail be sent from our email that we have setup smtp with
        to: mailTo,
        subject: mailSubject,
        text: mailBody
    });
}

const fetchPendingMails = async (timeStamp) => {
    try {
        const response = await repo.get({status: "PENDING"});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error)
    }
}

// this function is tp update the status after sending the mail 
const updateTicket = async (ticketId, data) =>{
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        console.log(error)
    }
}

const subscribeEvents = async (payload) => {
    let service = payload.service;
    let data = payload.data;
    switch(service){
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_MAIL':
            await sendBasicEmail(data);
            break;
        default:
            console.log('No valid event recieved');
            break;
    }
}
 
module.exports = {
    sendBasicEmail,
    fetchPendingMails,
    createNotification,
    updateTicket,
    subscribeEvents
}