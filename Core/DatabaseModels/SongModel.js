import mongoose from '../Configurations/Mongoose.js';

const SongDetails = new mongoose.Schema({
    Name: { type: String, default: 'NA', required: true },
    Singers: [{ type: String, default: 'NA', required: true }],
    Album: { type: String, default: 'NA', required: true },
    CreatedAt: { type: Date, default: new Date() }
}, { versionKey: false });

export default mongoose.model('Songs', SongDetails)