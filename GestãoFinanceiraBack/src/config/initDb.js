const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDb() {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);

    await connection.end();

    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    });

    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id CHAR(36) PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        passwordHash LONGTEXT NOT NULL,
        telefone VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await db.end();

  } catch (error) {
    console.error('Erro na inicialização do banco:', error);
    process.exit(1);
  }
}

module.exports = initDb;