import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import booksRoutes from './routes/books.js';
import circulationRoutes from './routes/circulation.js';
import reservationsRoutes from './routes/reservations.js';
import finesRoutes from './routes/fines.js';
import membersRoutes from './routes/members.js';
import reportsRoutes from './routes/reports.js';
import notificationsRoutes from './routes/notifications.js';
import settingsRoutes from './routes/settings.js';
import db from './db.js';
import { seedDatabase } from './seed.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Auto-seed if database is empty
const users = db.find('users');
if (users.length === 0) {
  console.log('⚡ Empty database detected, running initial seed...');
  seedDatabase();
}

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/circulation', circulationRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/fines', finesRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/settings', settingsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'LibreFlow Library Management & Book Circulation Portal',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 LibreFlow Server running on http://localhost:${PORT}`);
});
