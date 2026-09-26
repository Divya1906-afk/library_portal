import bcrypt from 'bcryptjs';
import db from './db.js';

export async function seedDatabase() {
  console.log('🌱 Seeding database...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Users
  const users = [
    {
      id: 'usr_admin',
      name: 'Eleanor Vance',
      email: 'admin@library.com',
      password_hash: passwordHash,
      role: 'admin',
      phone: '+1 (555) 234-5678',
      address: 'Central Library HQ, Floor 4, New York, NY',
      membership_id: 'ADM-001',
      membership_status: 'active',
      membership_start_date: '2023-01-15',
      created_at: new Date('2023-01-15').toISOString()
    },
    {
      id: 'usr_staff',
      name: 'Arthur Pendelton',
      email: 'staff@library.com',
      password_hash: passwordHash,
      role: 'staff',
      phone: '+1 (555) 345-6789',
      address: 'Circulation Desk #2, Central Library',
      membership_id: 'STF-042',
      membership_status: 'active',
      membership_start_date: '2023-06-01',
      created_at: new Date('2023-06-01').toISOString()
    },
    {
      id: 'usr_maya',
      name: 'Maya Lin',
      email: 'maya@member.com',
      password_hash: passwordHash,
      role: 'member',
      phone: '+1 (555) 987-6543',
      address: '742 Evergreen Terrace, Springfield',
      membership_id: 'LIB-8801',
      membership_status: 'active',
      membership_start_date: '2024-02-10',
      created_at: new Date('2024-02-10').toISOString()
    },
    {
      id: 'usr_david',
      name: 'David Kim',
      email: 'david@member.com',
      password_hash: passwordHash,
      role: 'member',
      phone: '+1 (555) 456-7890',
      address: '120 Broadway Apt 4B, New York, NY',
      membership_id: 'LIB-8802',
      membership_status: 'active',
      membership_start_date: '2024-03-01',
      created_at: new Date('2024-03-01').toISOString()
    },
    {
      id: 'usr_sophia',
      name: 'Sophia Martinez',
      email: 'sophia@member.com',
      password_hash: passwordHash,
      role: 'member',
      phone: '+1 (555) 678-1234',
      address: '88 Market St, San Francisco, CA',
      membership_id: 'LIB-8803',
      membership_status: 'active',
      membership_start_date: '2024-04-12',
      created_at: new Date('2024-04-12').toISOString()
    },
    {
      id: 'usr_james',
      name: 'James Wilson',
      email: 'james@member.com',
      password_hash: passwordHash,
      role: 'member',
      phone: '+1 (555) 321-9876',
      address: '55 Elm Street, Boston, MA',
      membership_id: 'LIB-8804',
      membership_status: 'active',
      membership_start_date: '2024-05-20',
      created_at: new Date('2024-05-20').toISOString()
    },
    {
      id: 'usr_emily',
      name: 'Emily Watson',
      email: 'emily@member.com',
      password_hash: passwordHash,
      role: 'member',
      phone: '+1 (555) 789-0123',
      address: '14 Lakeview Drive, Seattle, WA',
      membership_id: 'LIB-8805',
      membership_status: 'suspended',
      membership_start_date: '2023-11-05',
      created_at: new Date('2023-11-05').toISOString()
    }
  ];

  // 2. Books & Copies
  const rawBooks = [
    {
      id: 'bk_clean_code',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      isbn: '978-0132350884',
      author: 'Robert C. Martin',
      publisher: 'Prentice Hall',
      edition: '1st Edition',
      category: 'Technology',
      language: 'English',
      description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost due to poorly written code. This book is a must-read for any developer looking to write clean, maintainable, and elegant software.',
      cover_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      copies: [
        { copy_number: 1, barcode: 'BC-1001-1', shelf_location: 'Rack CS-A1', status: 'available' },
        { copy_number: 2, barcode: 'BC-1001-2', shelf_location: 'Rack CS-A1', status: 'issued' },
        { copy_number: 3, barcode: 'BC-1001-3', shelf_location: 'Rack CS-A1', status: 'available' }
      ]
    },
    {
      id: 'bk_ddia',
      title: 'Designing Data-Intensive Applications',
      isbn: '978-1449373320',
      author: 'Martin Kleppmann',
      publisher: "O'Reilly Media",
      edition: '1st Edition',
      category: 'Technology',
      language: 'English',
      description: 'Data is at the center of many challenges in system design today. Difficult issues need to be figured out, such as scalability, consistency, reliability, efficiency, and maintainability. In this practical and comprehensive guide, author Martin Kleppmann helps you navigate this diverse landscape by examining the pros and cons of various technologies.',
      cover_image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      copies: [
        { copy_number: 1, barcode: 'BC-1002-1', shelf_location: 'Rack CS-A2', status: 'issued' },
        { copy_number: 2, barcode: 'BC-1002-2', shelf_location: 'Rack CS-A2', status: 'reserved' }
      ]
    },
    {
      id: 'bk_dune',
      title: 'Dune',
      isbn: '978-0441172719',
      author: 'Frank Herbert',
      publisher: 'Ace Books',
      edition: 'Deluxe Edition',
      category: 'Sci-Fi',
      language: 'English',
      description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness.',
      cover_image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      copies: [
        { copy_number: 1, barcode: 'BC-1003-1', shelf_location: 'Rack SF-01', status: 'available' },
        { copy_number: 2, barcode: 'BC-1003-2', shelf_location: 'Rack SF-01', status: 'available' },
        { copy_number: 3, barcode: 'BC-1003-3', shelf_location: 'Rack SF-01', status: 'issued' }
      ]
    },
    {
      id: 'bk_atomic_habits',
      title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      isbn: '978-0735211292',
      author: 'James Clear',
      publisher: 'Avery',
      edition: '1st Edition',
      category: 'Self-Help',
      language: 'English',
      description: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
      cover_image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      copies: [
        { copy_number: 1, barcode: 'BC-1004-1', barcode: 'BC-1004-1', shelf_location: 'Rack SH-03', status: 'available' },
        { copy_number: 2, barcode: 'BC-1004-2', shelf_location: 'Rack SH-03', status: 'available' }
      ]
    },
    {
      id: 'bk_project_hail_mary',
      title: 'Project Hail Mary',
      isbn: '978-0593135204',
      author: 'Andy Weir',
      publisher: 'Ballantine Books',
      edition: '1st Edition',
      category: 'Sci-Fi',
      language: 'English',
      description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn\'t know that. He can\'t even remember his own name, let alone the nature of his assignment or how to complete it.',
      cover_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      copies: [
        { copy_number: 1, barcode: 'BC-1005-1', shelf_location: 'Rack SF-02', status: 'issued' },
        { copy_number: 2, barcode: 'BC-1005-2', shelf_location: 'Rack SF-02', status: 'under_repair' }
      ]
    },
    {
      id: 'bk_gatsby',
      title: 'The Great Gatsby',
      isbn: '978-0743273565',
      author: 'F. Scott Fitzgerald',
      publisher: 'Scribner',
      edition: 'Classic Reissue',
      category: 'Classics',
      language: 'English',
      description: 'The story of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted "gin was the national drink and sex the national obsession," it is an exquisitely crafted tale of America in the 1920s.',
      cover_image_url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
      rating: 4.5,
      copies: [
        { copy_number: 1, barcode: 'BC-1006-1', shelf_location: 'Rack CL-01', status: 'available' },
        { copy_number: 2, barcode: 'BC-1006-2', shelf_location: 'Rack CL-01', status: 'available' }
      ]
    },
    {
      id: 'bk_thinking_fast',
      title: 'Thinking, Fast and Slow',
      isbn: '978-0374533557',
      author: 'Daniel Kahneman',
      publisher: 'Farrar, Straus and Giroux',
      edition: '1st Edition',
      category: 'Psychology',
      language: 'English',
      description: 'In the international bestseller, Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think: System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.',
      cover_image_url: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80',
      rating: 4.6,
      copies: [
        { copy_number: 1, barcode: 'BC-1007-1', shelf_location: 'Rack PS-02', status: 'available' },
        { copy_number: 2, barcode: 'BC-1007-2', shelf_location: 'Rack PS-02', status: 'issued' }
      ]
    },
    {
      id: 'bk_1984',
      title: '1984',
      isbn: '978-0451524935',
      author: 'George Orwell',
      publisher: 'Signet Classic',
      edition: 'Mass Market',
      category: 'Sci-Fi',
      language: 'English',
      description: 'Winston Smith toes the Party line, rewriting history to satisfy the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes. But as he begins to think for himself, Winston can\'t escape the fact that Big Brother is always watching.',
      cover_image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      copies: [
        { copy_number: 1, barcode: 'BC-1008-1', shelf_location: 'Rack CL-03', status: 'available' },
        { copy_number: 2, barcode: 'BC-1008-2', shelf_location: 'Rack CL-03', status: 'available' },
        { copy_number: 3, barcode: 'BC-1008-3', shelf_location: 'Rack CL-03', status: 'lost' }
      ]
    },
    {
      id: 'bk_design_everyday',
      title: 'The Design of Everyday Things',
      isbn: '978-0465050659',
      author: 'Don Norman',
      publisher: 'Basic Books',
      edition: 'Revised and Expanded',
      category: 'Design',
      language: 'English',
      description: 'Even the smartest among us can feel inept as we fail to figure out which switch or handle to push. The fault, argues this ingenious-even-liberating book, lies not in ourselves, but in product design that ignores the needs of users and the principles of cognitive psychology.',
      cover_image_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      copies: [
        { copy_number: 1, barcode: 'BC-1009-1', shelf_location: 'Rack DS-01', status: 'available' },
        { copy_number: 2, barcode: 'BC-1009-2', shelf_location: 'Rack DS-01', status: 'available' }
      ]
    },
    {
      id: 'bk_pragmatic_prog',
      title: 'The Pragmatic Programmer: Your Journey To Mastery',
      isbn: '978-0135957059',
      author: 'David Thomas, Andrew Hunt',
      publisher: 'Addison-Wesley Professional',
      edition: '20th Anniversary Edition',
      category: 'Technology',
      language: 'English',
      description: 'Written as a series of self-contained sections and filled with entertaining anecdotes, thoughtful examples, and interesting analogies, The Pragmatic Programmer illustrates the best approaches and major pitfalls of many aspects of software development.',
      cover_image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      copies: [
        { copy_number: 1, barcode: 'BC-1010-1', shelf_location: 'Rack CS-A3', status: 'available' },
        { copy_number: 2, barcode: 'BC-1010-2', shelf_location: 'Rack CS-A3', status: 'available' }
      ]
    },
    {
      id: 'bk_sapiens',
      title: 'Sapiens: A Brief History of Humankind',
      isbn: '978-0062316097',
      author: 'Yuval Noah Harari',
      publisher: 'Harper',
      edition: '1st Edition',
      category: 'History',
      language: 'English',
      description: 'One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—homo sapiens. What happened to the others? And what may happen to us? Most books about the history of humanity pursue either a historical or a biological approach, but Dr. Yuval Noah Harari breaks the mold.',
      cover_image_url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      copies: [
        { copy_number: 1, barcode: 'BC-1011-1', shelf_location: 'Rack HS-01', status: 'available' },
        { copy_number: 2, barcode: 'BC-1011-2', shelf_location: 'Rack HS-01', status: 'available' }
      ]
    },
    {
      id: 'bk_hobbit',
      title: 'The Hobbit',
      isbn: '978-0547928227',
      author: 'J.R.R. Tolkien',
      publisher: 'Houghton Mifflin Harcourt',
      edition: 'Collector Edition',
      category: 'Fantasy',
      language: 'English',
      description: 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure.',
      cover_image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      copies: [
        { copy_number: 1, barcode: 'BC-1012-1', shelf_location: 'Rack FT-01', status: 'available' },
        { copy_number: 2, barcode: 'BC-1012-2', shelf_location: 'Rack FT-01', status: 'available' }
      ]
    }
  ];

  const books = [];
  const book_copies = [];

  for (const b of rawBooks) {
    const { copies, ...bookData } = b;
    books.push({
      ...bookData,
      created_at: new Date('2024-01-10').toISOString()
    });

    for (const c of copies) {
      book_copies.push({
        id: `cpy_${c.barcode.replace(/[^a-zA-Z0-9]/g, '_')}`,
        book_id: b.id,
        copy_number: c.copy_number,
        barcode: c.barcode,
        shelf_location: c.shelf_location,
        status: c.status,
        created_at: new Date('2024-01-10').toISOString()
      });
    }
  }

  // 3. Loans (Active, Overdue, Returned)
  const today = new Date();
  
  // Overdue date: 5 days ago
  const overdueDueDate = new Date(today);
  overdueDueDate.setDate(today.getDate() - 5);
  const overdueIssueDate = new Date(overdueDueDate);
  overdueIssueDate.setDate(overdueDueDate.getDate() - 14);

  // Active date: due in 9 days
  const activeDueDate = new Date(today);
  activeDueDate.setDate(today.getDate() + 9);
  const activeIssueDate = new Date(activeDueDate);
  activeIssueDate.setDate(activeDueDate.getDate() - 14);

  // Past returned loan date
  const pastReturnDate = new Date(today);
  pastReturnDate.setDate(today.getDate() - 20);
  const pastIssueDate = new Date(pastReturnDate);
  pastIssueDate.setDate(pastReturnDate.getDate() - 12);

  const loans = [
    // Maya: 1 Overdue loan on Clean Code (Copy 2)
    {
      id: 'ln_maya_overdue',
      book_copy_id: 'cpy_BC_1001_2',
      book_id: 'bk_clean_code',
      user_id: 'usr_maya',
      issue_date: overdueIssueDate.toISOString(),
      due_date: overdueDueDate.toISOString(),
      return_date: null,
      status: 'overdue',
      renewal_count: 0,
      created_at: overdueIssueDate.toISOString()
    },
    // Maya: 1 Active loan on Dune (Copy 3)
    {
      id: 'ln_maya_active',
      book_copy_id: 'cpy_BC_1003_3',
      book_id: 'bk_dune',
      user_id: 'usr_maya',
      issue_date: activeIssueDate.toISOString(),
      due_date: activeDueDate.toISOString(),
      return_date: null,
      status: 'active',
      renewal_count: 1,
      created_at: activeIssueDate.toISOString()
    },
    // David: 1 Active loan on DDIA (Copy 1)
    {
      id: 'ln_david_active',
      book_copy_id: 'cpy_BC_1002_1',
      book_id: 'bk_ddia',
      user_id: 'usr_david',
      issue_date: activeIssueDate.toISOString(),
      due_date: activeDueDate.toISOString(),
      return_date: null,
      status: 'active',
      renewal_count: 0,
      created_at: activeIssueDate.toISOString()
    },
    // Emily: 1 Overdue loan on Thinking Fast (Copy 2)
    {
      id: 'ln_emily_overdue',
      book_copy_id: 'cpy_BC_1007_2',
      book_id: 'bk_thinking_fast',
      user_id: 'usr_emily',
      issue_date: overdueIssueDate.toISOString(),
      due_date: overdueDueDate.toISOString(),
      return_date: null,
      status: 'overdue',
      renewal_count: 0,
      created_at: overdueIssueDate.toISOString()
    },
    // James: Past returned loan on Project Hail Mary
    {
      id: 'ln_james_returned',
      book_copy_id: 'cpy_BC_1005_1',
      book_id: 'bk_project_hail_mary',
      user_id: 'usr_james',
      issue_date: pastIssueDate.toISOString(),
      due_date: new Date(pastIssueDate.getTime() + 14 * 86400000).toISOString(),
      return_date: pastReturnDate.toISOString(),
      status: 'returned',
      renewal_count: 0,
      created_at: pastIssueDate.toISOString()
    }
  ];

  // 4. Reservations / Holds
  const holdExpiry = new Date(today);
  holdExpiry.setHours(today.getHours() + 36);

  const reservations = [
    {
      id: 'res_sophia_ddia',
      book_id: 'bk_ddia',
      user_id: 'usr_sophia',
      reserved_at: new Date(today.getTime() - 2 * 86400000).toISOString(),
      status: 'ready',
      queue_position: 1,
      expiry_date: holdExpiry.toISOString(),
      created_at: new Date(today.getTime() - 2 * 86400000).toISOString()
    },
    {
      id: 'res_james_ddia',
      book_id: 'bk_ddia',
      user_id: 'usr_james',
      reserved_at: new Date(today.getTime() - 1 * 86400000).toISOString(),
      status: 'waiting',
      queue_position: 2,
      expiry_date: null,
      created_at: new Date(today.getTime() - 1 * 86400000).toISOString()
    }
  ];

  // 5. Fines
  const fines = [
    {
      id: 'fn_maya_1',
      loan_id: 'ln_maya_overdue',
      user_id: 'usr_maya',
      amount: 25,
      reason: 'Overdue fine for Clean Code (5 days)',
      status: 'unpaid',
      created_at: overdueDueDate.toISOString(),
      resolved_at: null
    },
    {
      id: 'fn_emily_1',
      loan_id: 'ln_emily_overdue',
      user_id: 'usr_emily',
      amount: 35,
      reason: 'Overdue fine for Thinking, Fast and Slow (7 days)',
      status: 'unpaid',
      created_at: overdueDueDate.toISOString(),
      resolved_at: null
    },
    {
      id: 'fn_james_paid',
      loan_id: 'ln_james_returned',
      user_id: 'usr_james',
      amount: 10,
      reason: 'Overdue fine for Project Hail Mary (2 days)',
      status: 'paid',
      created_at: pastReturnDate.toISOString(),
      resolved_at: pastReturnDate.toISOString()
    }
  ];

  // 6. Notifications
  const notifications = [
    {
      id: 'notif_maya_1',
      user_id: 'usr_maya',
      type: 'overdue_alert',
      message: '🚨 Alert: "Clean Code" is 5 days overdue! Current fine is $25. Please return it to avoid suspension.',
      is_read: false,
      created_at: new Date(today.getTime() - 12 * 3600000).toISOString()
    },
    {
      id: 'notif_maya_2',
      user_id: 'usr_maya',
      type: 'due_reminder',
      message: '📅 Reminder: "Dune" is due in 9 days (on ' + activeDueDate.toLocaleDateString() + ').',
      is_read: true,
      created_at: new Date(today.getTime() - 48 * 3600000).toISOString()
    },
    {
      id: 'notif_sophia_1',
      user_id: 'usr_sophia',
      type: 'reservation_ready',
      message: '🎉 Great news! Your reserved copy of "Designing Data-Intensive Applications" is now READY for pickup at the counter until ' + holdExpiry.toLocaleDateString() + '.',
      is_read: false,
      created_at: new Date(today.getTime() - 4 * 3600000).toISOString()
    },
    {
      id: 'notif_admin_1',
      user_id: 'usr_admin',
      type: 'system_alert',
      message: 'System Check: 2 items currently overdue. Total unpaid fines in ledger: $60.',
      is_read: false,
      created_at: new Date(today.getTime() - 2 * 3600000).toISOString()
    }
  ];

  // 7. Reviews
  const reviews = [
    {
      id: 'rev_1',
      book_id: 'bk_clean_code',
      user_id: 'usr_david',
      user_name: 'David Kim',
      rating: 5,
      comment: 'An absolute timeless classic for any professional engineer. Made my code ten times cleaner and more readable.',
      created_at: '2024-04-10T10:00:00Z'
    },
    {
      id: 'rev_2',
      book_id: 'bk_ddia',
      user_id: 'usr_maya',
      user_name: 'Maya Lin',
      rating: 5,
      comment: 'The bible of distributed systems and database architectures. Required reading for all backend engineers.',
      created_at: '2024-05-15T14:30:00Z'
    },
    {
      id: 'rev_3',
      book_id: 'bk_project_hail_mary',
      user_id: 'usr_james',
      user_name: 'James Wilson',
      rating: 5,
      comment: 'Even better than The Martian! Rocky and Grace are unforgettable. Could not put it down.',
      created_at: '2024-06-02T19:00:00Z'
    }
  ];

  // Save all into DB
  db.save({
    users,
    books,
    book_copies,
    loans,
    reservations,
    fines,
    notifications,
    reviews,
    settings: {
      fine_per_day: 5,
      currency_symbol: '$',
      loan_period_days: 14,
      max_renewals: 2,
      max_books_per_member: 5,
      fine_block_threshold: 20,
      hold_pickup_deadline_hours: 48
    }
  });

  console.log('✅ Database successfully seeded with rich realistic library data!');
}

// Execute if run directly
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase();
}
