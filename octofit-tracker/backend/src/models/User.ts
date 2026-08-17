import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  city: string;
}

const userSchema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
