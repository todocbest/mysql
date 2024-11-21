const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// 새 문장 추가
async function addSentence(sentenceData) {
  const { title, author, sentence, category } = sentenceData;
  try {
    const [result] = await connection.execute(
      'INSERT INTO sentences (title, author, sentence, category) VALUES (?, ?, ?, ?)',
      [title, author, sentence, category]
    );
    return result.insertId; // 새로 생성된 문장의 ID 반환
  } catch (err) {
    console.error('Error inserting sentence:', err.message);
    throw err;
  }
}

// 문장 가져오기
async function getSentences() {
  try {
    const [rows] = await connection.query('SELECT * FROM sentences');
    return rows;
  } catch (err) {
    console.error('Error fetching sentences:', err.message);
    throw err;
  }
}

module.exports = { addSentence, getSentences };
