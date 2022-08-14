import express from 'express';
import morgan from './Morgan.js'

import Configurations from '../Utilities/GlobalValues.js';
import Route from '../Routes/Routes.js'
import AuthMiddleware from '../General/Service.General.js'

const Server = express();

try {
    global.CurrentWorkingDirectory = process.cwd();
    Server.use(express.json())
    Server.use(express.urlencoded({ extended: true }));
    Server.use(morgan(':method -- :url -- :status -- :response-time ms'));

    Server.use('/Api/Auth', AuthMiddleware.RequestValidator);
    Server.use('/Api', Route);

    // Server.use('*', );

    Server.listen(Configurations.ServerPort)
    console.log('----------------------------------------------')
    console.log(`Server Initiated On ${Configurations.ServerPort}`);

} catch (e) {
    console.log('Server Failed To Intiate');
}

export default Server;