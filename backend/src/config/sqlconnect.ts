import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  port: parseInt(process.env.SQL_PORT),
  // ssl: {
  //   rejectUnauthorized: true,
  // }
};

const pool = await mysql.createPool(access);

export default pool;