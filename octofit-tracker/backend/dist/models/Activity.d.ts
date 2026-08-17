import mongoose, { type Document } from 'mongoose';
export interface IActivity extends Document {
    user: mongoose.Types.ObjectId;
    type: string;
    durationMinutes: number;
    caloriesBurned: number;
    distanceKm: number;
    date: Date;
}
export declare const Activity: mongoose.Model<IActivity, {}, {}, {}, mongoose.Document<unknown, {}, IActivity, {}, {}> & IActivity & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Activity.d.ts.map