const express = require('express');
const cors = require('cors'); // CORS 추가
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// 데이터베이스 연결
connectDB();

// CORS 미들웨어 설정
app.use(cors({
  origin: '*', // 특정 도메인만 허용하려면 'https://your-frontend-domain.com'으로 변경
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON 파싱 미들웨어 설정
app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 라우트 추가
const sentenceRoutes = require('./routes/sentenceRoutes');
app.use('/api/sentences', sentenceRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// 서버 실행
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
