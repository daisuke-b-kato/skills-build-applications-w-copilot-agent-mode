import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    difficulty: {
        type: String,
        enum: ['easy', 'moderate', 'hard'],
        default: 'moderate'
    },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, required: true },
    equipment: [{ type: String }],
    instructions: [{ type: String }]
}, { timestamps: true });
export const Workout = mongoose.model('Workout', workoutSchema);
//# sourceMappingURL=Workout.js.map