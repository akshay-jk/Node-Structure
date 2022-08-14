import mongoose from '../Configurations/Mongoose.js';

let UserDetails = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    PasswordHash: { type: String, required: true },
    Phone: { type: String, required: true },
    CreatedAt: { type: Date, required: true, default: new Date() },
    UpdatedAt: { type: Date, required: true, default: new Date() }
}, { versionKey: false });

export default mongoose.model('Users', UserDetails)