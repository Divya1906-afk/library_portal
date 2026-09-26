import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DEFAULT_DB = {
  users: [],
  books: [],
  book_copies: [],
  loans: [],
  reservations: [],
  fines: [],
  notifications: [],
  reviews: [],
  settings: {
    fine_per_day: 5, // in currency units ($ or ₹)
    currency_symbol: '$',
    loan_period_days: 14,
    max_renewals: 2,
    max_books_per_member: 5,
    fine_block_threshold: 20,
    hold_pickup_deadline_hours: 48
  }
};

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Error loading database, resetting to default:', err);
    }
    this.save(DEFAULT_DB);
    return JSON.parse(JSON.stringify(DEFAULT_DB));
  }

  save(dataToSave = this.data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save database file:', err);
    }
  }

  // Get table
  table(tableName) {
    if (!this.data[tableName]) {
      this.data[tableName] = [];
    }
    return this.data[tableName];
  }

  // Find all matching
  find(tableName, predicate = () => true) {
    return this.table(tableName).filter(predicate);
  }

  // Find one
  findOne(tableName, predicate) {
    return this.table(tableName).find(predicate) || null;
  }

  // Find by ID
  findById(tableName, id) {
    return this.table(tableName).find(item => item.id === id) || null;
  }

  // Insert item
  insert(tableName, item) {
    const table = this.table(tableName);
    const prefix = tableName.slice(0, 3);
    const newItem = {
      id: item.id || `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      created_at: item.created_at || new Date().toISOString(),
      ...item
    };
    table.push(newItem);
    this.save();
    return newItem;
  }

  // Update item
  update(tableName, id, updates) {
    const table = this.table(tableName);
    const idx = table.findIndex(item => item.id === id);
    if (idx === -1) return null;
    
    table[idx] = {
      ...table[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.save();
    return table[idx];
  }

  // Delete item
  delete(tableName, id) {
    const table = this.table(tableName);
    const idx = table.findIndex(item => item.id === id);
    if (idx === -1) return false;
    table.splice(idx, 1);
    this.save();
    return true;
  }

  // Settings
  getSettings() {
    return this.data.settings || DEFAULT_DB.settings;
  }

  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.save();
    return this.data.settings;
  }

  // Overdue fine calculation checker
  recalculateOverdueFines() {
    const now = new Date();
    const activeLoans = this.find('loans', l => l.status === 'active' || l.status === 'overdue');
    const settings = this.getSettings();
    let updatedCount = 0;

    for (const loan of activeLoans) {
      const dueDate = new Date(loan.due_date);
      if (now > dueDate) {
        // Loan is overdue
        if (loan.status !== 'overdue') {
          this.update('loans', loan.id, { status: 'overdue' });
        }

        const diffTime = Math.abs(now.getTime() - dueDate.getTime());
        const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const fineAmount = overdueDays * (settings.fine_per_day || 5);

        // Check if fine record exists for this loan
        const existingFine = this.findOne('fines', f => f.loan_id === loan.id && f.status === 'unpaid');
        if (existingFine) {
          if (existingFine.amount !== fineAmount) {
            this.update('fines', existingFine.id, {
              amount: fineAmount,
              reason: `Overdue fine for ${overdueDays} day(s)`
            });
            updatedCount++;
          }
        } else {
          // Check if it was already paid/waived
          const resolvedFine = this.findOne('fines', f => f.loan_id === loan.id && (f.status === 'paid' || f.status === 'waived'));
          if (!resolvedFine) {
            this.insert('fines', {
              loan_id: loan.id,
              user_id: loan.user_id,
              amount: fineAmount,
              reason: `Overdue fine for ${overdueDays} day(s)`,
              status: 'unpaid'
            });
            updatedCount++;
          }
        }
      }
    }
    return updatedCount;
  }

  // Auto promote hold queue when copy returns
  promoteNextHold(bookId) {
    const pendingHolds = this.find('reservations', r => r.book_id === bookId && r.status === 'waiting')
      .sort((a, b) => (a.queue_position || 999) - (b.queue_position || 999));
    
    if (pendingHolds.length === 0) return null;

    const nextHold = pendingHolds[0];
    const settings = this.getSettings();
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + (settings.hold_pickup_deadline_hours || 48));

    this.update('reservations', nextHold.id, {
      status: 'ready',
      expiry_date: expiry.toISOString()
    });

    // Notify the user
    const book = this.findById('books', bookId);
    this.insert('notifications', {
      user_id: nextHold.user_id,
      type: 'reservation_ready',
      message: `Your reserved copy of "${book ? book.title : 'a book'}" is now READY for pickup! Please collect it before ${expiry.toLocaleDateString()} ${expiry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
      is_read: false
    });

    // Re-adjust remaining waiting holds queue positions
    const remaining = pendingHolds.slice(1);
    remaining.forEach((hold, idx) => {
      this.update('reservations', hold.id, { queue_position: idx + 1 });
    });

    return nextHold;
  }
}

export const db = new Database();
export default db;
