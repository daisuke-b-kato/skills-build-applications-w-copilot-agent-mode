import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    streakDays: { type: Number, default: 0 }
}, { timestamps: true });
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
//# sourceMappingURL=Leaderboard.js.map