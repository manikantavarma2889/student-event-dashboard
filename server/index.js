
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'event_db'
});

app.post('/api/signup', async (req, res) => {
  const { name, email, username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)', [name, email, username, hashed], err => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send('User not found');
    const valid = await bcrypt.compare(password, results[0].password);
    if (!valid) return res.status(403).send('Wrong password');
    const token = jwt.sign({ id: results[0].id }, 'secret');
    res.json({ token });
  });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
