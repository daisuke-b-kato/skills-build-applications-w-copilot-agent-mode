import mongoose, { type Document } from 'mongoose';
export interface ILeaderboardEntry extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    points: number;
    rank: number;
    streakDays: number;
}
export declare const Leaderboard: mongoose.Model<ILeaderboardEntry, {}, {}, {}, mongoose.Document<unknown, {}, ILeaderboardEntry, {}, {}> & ILeaderboardEntry & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Leaderboard.d.ts.map