import mongoose from '../Configurations/Mongoose.js';

let SessionDetails = new mongoose.Schema({
    User: { type: mongoose.Types.ObjectId, ref: 'Users' },
    Hash: { type: String, required: true, default: '' },
    CreatedAt: { type: Date, required: true, default: new Date() }
}, { versionKey: false });

export default mongoose.model('Session', SessionDetails)