import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    focus: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
export const Team = mongoose.model('Team', teamSchema);
//# sourceMappingURL=Team.js.map