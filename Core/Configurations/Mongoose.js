import Configurations from '../Utilities/GlobalValues.js';

import mongoose from 'mongoose';

try {
    mongoose.connect(Configurations.MongoUri, {});
    mongoose.connection.on('connected', () => {
        console.log('---------------------------------');
        console.log('DataBase Connected');
        console.log('---------------------------------');
    })
} catch (e) {
    console.log('Database Down')
}

export default mongoose;