import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
}, { timestamps: true });
export const Activity = mongoose.model('Activity', activitySchema);
//# sourceMappingURL=Activity.js.map