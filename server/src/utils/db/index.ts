import mysql from "mysql2/promise";

let password = process.env.database_pass;

const config = {
  host: "localhost",
  user: "root",
  password,
  database: "mini-chat",
};
const configPool = {
  ...config,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

const query = mysql.createConnection(config);
const pool = mysql.createPool(configPool);

export { query, pool };
