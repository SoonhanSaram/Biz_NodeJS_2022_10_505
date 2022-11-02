import mysql from "mysql2";

const mysqlConfig = {
  host: "localhost",
  user: "root",

  password: "!Biz8080",
  database: "world",
};

const dbConnection = mysql.createConnection(mysqlConfig);

export default dbConnection;
