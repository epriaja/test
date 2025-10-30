const express = require('express');
const db = require('./database');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1>Aplikasi Vulnerable - Demo Keamanan Sistem</h1>
    <ul>
      <li><a href="/login">Login Page (SQL Injection Vulnerable)</a></li>
      <li><a href="/search">Search Page (XSS Vulnerable)</a></li>
    </ul>
    <p><strong>Catatan:</strong> Aplikasi ini sengaja dibuat vulnerable untuk tujuan pembelajaran!</p>
  `);
});

app.get('/login', (req, res) => {
  res.render('login', { error: null, success: null });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

  console.log('Executing query:', query);

  db.get(query, (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.render('login', { error: 'Database error occurred', success: null });
    }

    if (row) {
      res.render('login', {
        error: null,
        success: `Login berhasil! Selamat datang, ${row.email}`
      });
    } else {
      res.render('login', {
        error: 'Email atau password salah',
        success: null
      });
    }
  });
});

app.get('/search', (req, res) => {
  const searchQuery = req.query.q || '';
  res.render('search', { searchQuery });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log('');
  console.log('=== DEMO KERENTANAN ===');
  console.log('');
  console.log('1. SQL Injection di /login:');
  console.log('   Email: \' OR 1=1 --');
  console.log('   Password: (kosongkan)');
  console.log('');
  console.log('2. XSS di /search:');
  console.log('   Coba: /search?q=<script>alert("XSS")</script>');
  console.log('');
  console.log('User yang valid:');
  console.log('   - admin@example.com / admin123');
  console.log('   - user@example.com / password123');
});
