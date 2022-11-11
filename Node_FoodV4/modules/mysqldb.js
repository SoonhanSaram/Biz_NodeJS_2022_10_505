import mysql from "mysql2";

const mysqlconn1 = {
  host: "localhost",
  user: "root",
  password: "!Biz8080",
  database: "fooddb",
};
const mysqlconn = mysql.createConnection(mysqlconn1);
export default mysqlconn;
