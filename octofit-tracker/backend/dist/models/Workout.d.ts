import mongoose, { type Document } from 'mongoose';
export interface IWorkout extends Document {
    title: string;
    difficulty: 'easy' | 'moderate' | 'hard';
    durationMinutes: number;
    focus: string;
    equipment: string[];
    instructions: string[];
}
export declare const Workout: mongoose.Model<IWorkout, {}, {}, {}, mongoose.Document<unknown, {}, IWorkout, {}, {}> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Workout.d.ts.map