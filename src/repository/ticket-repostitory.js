const { NotificationTicket } = require('../models/index');
const { Op } = require('sequelize');

class TicketRepository {

    async getAll() {
        try {
            const tickets = await NotificationTicket.findAll();
            return tickets;
            
        } catch (error) {
            throw error;
        }
    }

    // this function will be used to create the tickets for us
    async create(data){
        try {
            const ticket = await NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            throw error
        }
    }

    async get(filter) {
        try {
            const tickets = await NotificationTicket.findAll({
                where:{
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()  //this will check for the time less than the current time
                    }
                }
            });
            return tickets;
        } catch (error) {
            throw error
        }
    }

    async update(ticketId, data) {
        try {
            const ticket = await NotificationTicket.findByPk(ticketId);
            if(data.status)
                ticket.status = data.status;
            
            await ticket.save();
            return ticket;
        } catch (error) {
            throw error
        }
    }
}

module.exports = TicketRepository;