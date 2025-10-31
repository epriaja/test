const express = require('express');
const db = require('./database');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Security Learning Lab - Website Keamanan</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        header {
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(10px);
          padding: 20px;
          text-align: center;
          border-bottom: 2px solid rgba(255,255,255,0.1);
        }
        header h1 {
          color: white;
          font-size: 32px;
          margin-bottom: 5px;
        }
        header p {
          color: rgba(255,255,255,0.9);
          font-size: 14px;
        }
        .container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
        }
        .content {
          max-width: 900px;
          width: 100%;
        }
        .intro {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          margin-bottom: 30px;
          text-align: center;
        }
        .intro h2 {
          color: #333;
          margin-bottom: 15px;
          font-size: 24px;
        }
        .intro p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 10px;
        }
        .warning-box {
          background: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 15px;
          margin: 15px 0;
          border-radius: 5px;
          color: #856404;
          font-weight: 500;
        }
        .demos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-top: 30px;
        }
        .demo-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .demo-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }
        .demo-header {
          padding: 25px;
          color: white;
          font-weight: bold;
          font-size: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .demo-header.sql {
          background: linear-gradient(135deg, #ee7752 0%, #e73c7e 50%, #23a6d5 100%);
        }
        .demo-header.xss {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .demo-content {
          padding: 25px;
        }
        .demo-content h3 {
          color: #333;
          margin-bottom: 10px;
          font-size: 18px;
        }
        .demo-content p {
          color: #666;
          margin-bottom: 10px;
          line-height: 1.6;
          font-size: 14px;
        }
        .demo-content code {
          background: #f5f5f5;
          padding: 3px 8px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          color: #d32f2f;
          font-size: 13px;
        }
        .demo-button {
          display: inline-block;
          padding: 12px 25px;
          margin-top: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          transition: transform 0.2s, box-shadow 0.2s;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }
        .demo-button:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }
        .icon {
          font-size: 24px;
        }
        @media (max-width: 768px) {
          .demos {
            grid-template-columns: 1fr;
          }
          header h1 {
            font-size: 24px;
          }
          .intro {
            padding: 25px;
          }
        }
      </style>
    </head>
    <body>
      <header>
        <h1>🔐 Security Learning Lab</h1>
        <p>Website Keamanan - Demo Kerentanan untuk Pembelajaran</p>
      </header>

      <div class="container">
        <div class="content">
          <div class="intro">
            <h2>Selamat Datang di Lab Keamanan Sistem</h2>
            <p>Platform pembelajaran interaktif untuk memahami kerentanan web modern</p>
            <div class="warning-box">
              ⚠️ <strong>Peringatan:</strong> Website ini sengaja dibuat dengan kerentanan keamanan untuk tujuan pembelajaran dan penelitian. Jangan gunakan teknik ini di website milik orang lain tanpa izin!
            </div>
          </div>

          <div class="demos">
            <div class="demo-card">
              <div class="demo-header sql">
                <span class="icon">💉</span> SQL Injection
              </div>
              <div class="demo-content">
                <h3>Pelajari SQL Injection</h3>
                <p>Pahami bagaimana inputan pengguna dapat dimanipulasi untuk mengakses database secara ilegal.</p>
                <p><strong>Payload Contoh:</strong></p>
                <p><code>' OR 1=1 --</code></p>
                <p>Klik tombol di bawah untuk mengakses halaman login yang vulnerable.</p>
                <a href="/login" class="demo-button">Buka Login Page</a>
              </div>
            </div>

            <div class="demo-card">
              <div class="demo-header xss">
                <span class="icon">⚡</span> XSS (Cross-Site Scripting)
              </div>
              <div class="demo-content">
                <h3>Pelajari XSS Attacks</h3>
                <p>Temukan bagaimana script berbahaya dapat disuntikkan dan dijalankan di browser pengguna.</p>
                <p><strong>Payload Contoh:</strong></p>
                <p><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></p>
                <p>Klik tombol di bawah untuk mengakses halaman search yang vulnerable.</p>
                <a href="/search" class="demo-button">Buka Search Page</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
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
