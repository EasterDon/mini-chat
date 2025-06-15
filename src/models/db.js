import mysql from "mysql2/promise";
let password = process.env.database_pass;
if (!password) {
    console.log("请确保.env文件中含有 database_pass 字段");
    process.exit(1);
}
const config = {
    host: "localhost",
    user: "mini-chat",
    password,
    database: "mini-chat",
};
const configPool = Object.assign(Object.assign({}, config), { waitForConnections: true, connectionLimit: 10, maxIdle: 10, idleTimeout: 60000, queueLimit: 0, enableKeepAlive: true, keepAliveInitialDelay: 0 });
const query = mysql.createConnection(config);
const pool = mysql.createPool(configPool);
export { query, pool };
