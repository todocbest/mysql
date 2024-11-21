const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL 연결 풀 생성
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// 새 사용자 추가
async function addUser(userData) {
  const { name, email, password, phone } = userData;

  // 비밀번호와 전화번호의 유효성 검사
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      '비밀번호는 8글자 이상이어야 하며, 대문자, 소문자, 특수문자를 포함해야 합니다.'
    );
  }

  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('전화번호는 10~11자리 숫자여야 합니다.');
  }

  try {
    const query = `
      INSERT INTO users (name, email, password, phone)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await connection.execute(query, [name, email, password, phone]);
    return result.insertId; // 새로 생성된 사용자의 ID 반환
  } catch (err) {
    console.error('Error inserting user:', err.message);
    throw err;
  }
}

// 모든 사용자 가져오기
async function getUsers() {
  try {
    const query = `SELECT * FROM users`;
    const [rows] = await connection.query(query);
    return rows;
  } catch (err) {
    console.error('Error fetching users:', err.message);
    throw err;
  }
}

module.exports = { addUser, getUsers };
