import mongoose, { type Document } from 'mongoose';
export interface ITeam extends Document {
    name: string;
    focus: string;
    description: string;
    members: mongoose.Types.ObjectId[];
}
export declare const Team: mongoose.Model<ITeam, {}, {}, {}, mongoose.Document<unknown, {}, ITeam, {}, {}> & ITeam & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Team.d.ts.map