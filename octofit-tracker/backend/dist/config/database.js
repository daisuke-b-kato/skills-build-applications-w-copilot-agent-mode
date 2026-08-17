import mongoose from 'mongoose';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
export async function connectDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`Connected to MongoDB: ${MONGODB_URI}`);
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}
export async function disconnectDatabase() {
    await mongoose.disconnect();
}
mongoose.connection.on('error', (error) => {
    console.error('Database connection error:', error);
});
export default mongoose;
//# sourceMappingURL=database.js.map