import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);

app.use(express.json());

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
}

const buildCollectionResponse = <T>(resource: string, items: T[]) => ({
  resource,
  count: items.length,
  results: items
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running', database: 'octofit_db' });
});

app.get('/api/users/', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 1 }).lean();
    res.json(buildCollectionResponse('users', users));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: (error as Error).message });
  }
});

app.post('/api/users/', async (req, res) => {
  try {
    const payload = req.body ?? {};
    const createdUser = await User.create(payload);
    res.status(201).json({ message: 'User created', user: createdUser.toObject() });
  } catch (error) {
    res.status(400).json({ message: 'User creation failed', error: (error as Error).message });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name email fitnessLevel').sort({ createdAt: 1 }).lean();
    res.json(buildCollectionResponse('teams', teams));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error: (error as Error).message });
  }
});

app.post('/api/teams/', async (req, res) => {
  try {
    const payload = req.body ?? {};
    const createdTeam = await Team.create(payload);
    res.status(201).json({ message: 'Team created', team: createdTeam.toObject() });
  } catch (error) {
    res.status(400).json({ message: 'Team creation failed', error: (error as Error).message });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 }).lean();
    res.json(buildCollectionResponse('activities', activities));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error: (error as Error).message });
  }
});

app.post('/api/activities/', async (req, res) => {
  try {
    const payload = req.body ?? {};
    const createdActivity = await Activity.create(payload);
    res.status(201).json({ message: 'Activity logged', activity: createdActivity.toObject() });
  } catch (error) {
    res.status(400).json({ message: 'Activity creation failed', error: (error as Error).message });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ points: -1 }).lean();
    res.json(buildCollectionResponse('leaderboard', leaderboard));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error: (error as Error).message });
  }
});

app.post('/api/leaderboard/', async (req, res) => {
  try {
    const payload = req.body ?? {};
    const createdEntry = await Leaderboard.create(payload);
    res.status(201).json({ message: 'Leaderboard entry created', entry: createdEntry.toObject() });
  } catch (error) {
    res.status(400).json({ message: 'Leaderboard entry creation failed', error: (error as Error).message });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1 }).lean();
    res.json(buildCollectionResponse('workouts', workouts));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error: (error as Error).message });
  }
});

app.post('/api/workouts/', async (req, res) => {
  try {
    const payload = req.body ?? {};
    const createdWorkout = await Workout.create(payload);
    res.status(201).json({ message: 'Workout created', workout: createdWorkout.toObject() });
  } catch (error) {
    res.status(400).json({ message: 'Workout creation failed', error: (error as Error).message });
  }
});

export async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on ${getApiBaseUrl()}`);
    console.log(`API base URL: ${getApiBaseUrl()}/api`);
  });
}

if (process.argv[1]?.endsWith('/server.ts') || process.argv[1]?.endsWith('/server.js')) {
  startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

export default app;
