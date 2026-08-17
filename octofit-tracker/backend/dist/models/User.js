import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fitnessLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    goals: [{ type: String }],
    city: { type: String, required: true }
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
//# sourceMappingURL=User.js.map