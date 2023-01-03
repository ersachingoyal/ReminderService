const bodyParser = require('body-parser')
const express = require('express')

const { PORT } = require('./config/serverConfig');
const TicketController = require('./controllers/ticket-controller');

// const { sendBasicEmail } = require('./services/email-service');

const cron = require('node-cron')
const jobs = require('./utils/jobs')

const setUpAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/api/v1/tickets', TicketController.create); //because this is a very small service we are not creating the routes separately

    app.listen(PORT, () => {
        console.log(`Server started on the port ${PORT}`);

        //sending mail through nodemailer below
        // sendBasicEmail(
        //     'goyalsachin171@gmail.com',
        //     'goyalsachin176@gmail.com',
        //     'This is a testing mail',
        //     'Hey , how are you? I hope you like the support'
        // )

        //this cron job does the task every 2 minutes, we can use it to schedule the job any time just reading the documentation
        // cron.schedule('*/2 * * * *', () => {
        //     console.log('running a task every two minutes')
        // })

        jobs();
    })
    
}

setUpAndStartServer();