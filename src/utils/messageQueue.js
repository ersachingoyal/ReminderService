const amqplib = require('amqplib');
const { EXCHANGE_NAME, MESSAGE_BROKER_URL } = require('../config/serverConfig');

const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL); //first we have to create a connection
        const channel = await connection.createChannel(); //then we need to create a channel through that connection
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false); //will create an exchange for the channel, the exchange checks to which queue the msg needs to be redirected as we can have multiple queues
        //this msg redirection is done based on the binding the queue is having
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async (channel, service, binding_key) => { //the service param is used so that we can pass our own service and call it here as required without hitting the controller
    try {
      const applicationQueue = await channel.assertQueue("REMINDER_QUEUE");
      channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

      channel.consume(applicationQueue.queue, (msg) => {
        console.log("recieved data");
        console.log(msg.content.toString());
        const payload = JSON.parse(msg.content.toString());
        // if(payload.service == 'DEMO_SERVICE'){  //we can send a parameter in the payload and based on that we can call whichever service we need to call from the service file
        //     console.log('calling demo service');
        //     service.testingQueue(payload);
        // }
        service(payload);
        channel.ack(msg);
      });
    } catch (error) {
      throw error;
    }
    
}

const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue("REMINDER_QUEUE");
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}