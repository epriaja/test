const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./vulnerable_app.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  )`);

  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
      stmt.run('admin@example.com', 'admin123');
      stmt.run('user@example.com', 'password123');
      stmt.finalize();
      console.log('Database initialized with sample users');
    }
  });
});

module.exports = db;
