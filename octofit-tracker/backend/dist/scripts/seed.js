import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({})
        ]);
        const users = await User.insertMany([
            {
                name: 'Ada Thompson',
                email: 'ada@example.com',
                username: 'ada_runs',
                fitnessLevel: 'advanced',
                goals: ['5K race', 'strength consistency'],
                city: 'Seattle'
            },
            {
                name: 'Lin Chen',
                email: 'lin@example.com',
                username: 'lin_lifts',
                fitnessLevel: 'intermediate',
                goals: ['Build endurance', 'Improve mobility'],
                city: 'Austin'
            },
            {
                name: 'Samir Patel',
                email: 'samir@example.com',
                username: 'samir_cycles',
                fitnessLevel: 'beginner',
                goals: ['Lose weight', 'Walk more'],
                city: 'Denver'
            }
        ]);
        await Team.insertMany([
            {
                name: 'Trail Blazers',
                focus: 'Endurance',
                description: 'Long-distance runners focused on sustained cardio and pace work.',
                members: [users[0]._id, users[1]._id]
            },
            {
                name: 'Power Squad',
                focus: 'Strength',
                description: 'Strength-focused athletes improving power, form, and recovery.',
                members: [users[1]._id, users[2]._id]
            }
        ]);
        await Activity.insertMany([
            {
                user: users[0]._id,
                type: 'run',
                durationMinutes: 38,
                caloriesBurned: 420,
                distanceKm: 6.4,
                date: new Date('2026-08-10T06:30:00Z')
            },
            {
                user: users[1]._id,
                type: 'strength',
                durationMinutes: 52,
                caloriesBurned: 510,
                distanceKm: 0,
                date: new Date('2026-08-12T18:15:00Z')
            },
            {
                user: users[2]._id,
                type: 'cycling',
                durationMinutes: 34,
                caloriesBurned: 360,
                distanceKm: 14.8,
                date: new Date('2026-08-14T07:00:00Z')
            }
        ]);
        await Leaderboard.insertMany([
            { user: users[0]._id, name: users[0].name, points: 1420, rank: 1, streakDays: 12 },
            { user: users[1]._id, name: users[1].name, points: 1285, rank: 2, streakDays: 9 },
            { user: users[2]._id, name: users[2].name, points: 1170, rank: 3, streakDays: 5 }
        ]);
        await Workout.insertMany([
            {
                title: 'HIIT Burn',
                difficulty: 'moderate',
                durationMinutes: 25,
                focus: 'Cardio + conditioning',
                equipment: ['mat', 'jump rope'],
                instructions: ['Warm up for 5 minutes', 'Alternate 30s intervals', 'Cool down and stretch']
            },
            {
                title: 'Mobility Flow',
                difficulty: 'easy',
                durationMinutes: 20,
                focus: 'Mobility and recovery',
                equipment: ['yoga mat'],
                instructions: ['Perform cat-cow stretches', 'Open hips with lunges', 'Finish with breathing drills']
            },
            {
                title: 'Strength Builder',
                difficulty: 'hard',
                durationMinutes: 40,
                focus: 'Lower body power',
                equipment: ['dumbbells', 'bench'],
                instructions: ['Warm up with bodyweight squats', 'Do 4 rounds of lifts', 'Recover between sets']
            }
        ]);
        console.log('Database seeding complete');
        console.log('Seeded users, teams, activities, leaderboard, and workouts');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map