const bodyParser = require('body-parser')
const express = require('express')

const { PORT } = require('./config/serverConfig');

const { sendBasicEmail } = require('./services/email-service');

const setUpAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`Server started on the port ${PORT}`);

        sendBasicEmail(
            'goyalsachin171@gmail.com',
            'goyalsachin176@gmail.com',
            'This is a testing mail',
            'Hey , how are you? I hope you like the support'
        )
    })
    
}

setUpAndStartServer();