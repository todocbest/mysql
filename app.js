const express = require('express');
const cors = require('cors'); // CORS 추가
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// 데이터베이스 연결
connectDB();

// CORS 미들웨어 설정
app.use(cors());

// JSON 파싱 미들웨어 설정
app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 서버 실행
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
