import mongoose, { type Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    username: string;
    fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
    goals: string[];
    city: string;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map