const mysql = require('mysql2/promise');

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
    console.log('MySQL Database connected...');
    return connection;
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); // 실패 시 애플리케이션 종료
  }
};

module.exports = connectDB;
