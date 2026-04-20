import express, { type Request, type Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cryptomath_db'
};

app.post('/api/login', async (req: Request, res: Response): Promise<any> => {
  const { npm } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows]: any = await connection.execute('SELECT npm, name, points FROM users WHERE npm = ?', [npm]);
    await connection.end();
    if (rows.length > 0) return res.json({ success: true, user: rows[0] });
    return res.status(401).json({ success: false, message: 'NPM tidak terdaftar.' });
  } catch (error) { return res.status(500).json({ success: false, message: 'Database error.' }); }
});

app.get('/api/challenges/:npm', async (req: Request, res: Response): Promise<any> => {
  const { npm } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [challenges]: any = await connection.execute(`
      SELECT c.*, IF(us.npm IS NOT NULL, true, false) as is_solved 
      FROM challenges c 
      LEFT JOIN user_solved us ON c.id = us.challenge_id AND us.npm = ?
      ORDER BY c.level ASC
    `, [npm]);
    await connection.end();
    return res.json({ success: true, challenges });
  } catch (error) { return res.status(500).json({ success: false, message: 'Error memuat data.' }); }
});

app.post('/api/submit-answer', async (req: Request, res: Response): Promise<any> => {
  const { npm, challenge_id, answer } = req.body;
  if (!answer) return res.json({ success: false, message: 'Jawaban kosong!' });

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [chals]: any = await connection.execute('SELECT level, answer, points FROM challenges WHERE id = ?', [challenge_id]);
    if (chals.length === 0) { await connection.end(); return res.status(404).json({ success: false, message: 'Misi tidak ditemukan.' }); }
    
    const challenge = chals[0];
    const currentLevel = challenge.level;

    // --- SISTEM PENGUNCI LEVEL (LEVEL LOCKING) ---
    if (currentLevel > 1) {
      // Cari ID dari level sebelumnya (currentLevel - 1)
      const [prevChal]: any = await connection.execute('SELECT id FROM challenges WHERE level = ?', [currentLevel - 1]);
      if (prevChal.length > 0) {
        const prevId = prevChal[0].id;
        // Cek apakah user sudah menyelesaikan level sebelumnya
        const [checkPrev]: any = await connection.execute('SELECT * FROM user_solved WHERE npm = ? AND challenge_id = ?', [npm, prevId]);
        if (checkPrev.length === 0) {
          await connection.end();
          return res.json({ success: false, message: `Akses Ditolak! Kamu harus menyelesaikan Level ${currentLevel - 1} terlebih dahulu.` });
        }
      }
    }

    const cleanUser = answer.replace(/\s+/g, ' ').trim().toLowerCase();
    const cleanDb = challenge.answer.replace(/\s+/g, ' ').trim().toLowerCase();

    if (cleanUser !== cleanDb) { await connection.end(); return res.json({ success: false, message: 'Jawaban salah, Agen!' }); }

    const [solved]: any = await connection.execute('SELECT * FROM user_solved WHERE npm = ? AND challenge_id = ?', [npm, challenge_id]);
    if (solved.length > 0) { await connection.end(); return res.json({ success: false, message: 'Sudah diselesaikan!' }); }

    await connection.execute('INSERT INTO user_solved (npm, challenge_id) VALUES (?, ?)', [npm, challenge_id]);
    await connection.execute('UPDATE users SET points = points + ? WHERE npm = ?', [challenge.points, npm]);
    await connection.end();

    const newLeaderboard = await getLeaderboard();
    io.emit('update_leaderboard', newLeaderboard);
    
    return res.json({ success: true, message: 'Tepat Sekali! Poin ditambahkan.', points_added: challenge.points });
  } catch (error) { return res.status(500).json({ success: false, message: 'Server error.' }); }
});

const getLeaderboard = async () => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute('SELECT name, points FROM users ORDER BY points DESC');
  await connection.end();
  return rows;
};

io.on('connection', async (socket) => {
  socket.emit('update_leaderboard', await getLeaderboard());
});

server.listen(3001, '0.0.0.0', () => console.log('Server berjalan di http://localhost:3001'));