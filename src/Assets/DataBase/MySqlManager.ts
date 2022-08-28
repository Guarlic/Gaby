import mysql from 'mysql2/promise';
import logger from '../Utils/Logger.js';

/**
 * 흔해빠진 마이시퀄 풀임
 * @deprecated 아직 쓸일 없어영
 */
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'sadb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * MySQL 명령어 실행하고 결과 리턴해줍니다
 * @param sql MySQL 명령어
 * @returns *.rows, *.fileds 로 확인 가능합니다
 */
export const Query = (sql: string): Promise<any> =>
  new Promise<any>(async (resolve, reject) => {
    await pool.query(sql)
      .then(([rows, fields]) => {
        const res = {
          rows,
          fields,
        };

        resolve(res);
      })
      .catch(err => {
        logger.error(`Error: ${err.stack}`);
        reject(err);
      });
  });

/**
 * usecount 올려주는 함수
 * @param id 유저 id
 */
export const addUse = (id: string): Promise<boolean> =>
  new Promise<boolean>(async (resolve, reject) => {
    await Query(
      `insert into usecount value ('${id}', 1) on duplicate key update value = value + 1;`
    )
    .then(() => resolve(true))
    .catch(err => {
      logger.error(`Error: ${err.stack}`);
      reject(err);
    });
  });

/**
 * workcount 올려주는 함수
 * @param id 유저 id
 */
export const addWork = (id: string): Promise<boolean> =>
  new Promise<boolean>(async (resolve, reject) => {
    await Query(
      `insert into workcount value ('${id}', 1) on duplicate key update value = value + 1;`
    )
    .then(() => resolve(true))
    .catch(err => {
      logger.error(`Error: ${err.stack}`);
      reject(err);
    });
  });