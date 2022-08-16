import mysql from 'mysql';
import logger from '../Utils/Logger.js';

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'sadb',
});

export const Connect = () => {
  connection.connect(err => {
    if (err) throw err;
    logger.info('==> MySQL Connected...');
  })
}