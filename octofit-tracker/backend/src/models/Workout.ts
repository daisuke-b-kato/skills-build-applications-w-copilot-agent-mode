import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  durationMinutes: number;
  focus: string;
  equipment: string[];
  instructions: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
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
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
