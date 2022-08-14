import mongoose from '../Configurations/Mongoose.js';

const PlaylistDetails = new mongoose.Schema({
    CreatedAt: { type: Date, required: true, default: new Date() },
    User: { type: mongoose.Types.ObjectId, ref: 'Users' },
    Name: { type: String, default: '' },
    Songs: [{ type: mongoose.Types.ObjectId, ref: 'Songs' }]
}, { versionKey: false })

export default mongoose.model('playlist', PlaylistDetails)