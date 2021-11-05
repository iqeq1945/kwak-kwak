import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const getConnection = (callback) => {
  pool.getConnection(function (err, conn) {
    if (!err) {
      callback(conn);
    }
  });
};

export default getConnection;
