import mysql from "mysql2";

// MySQL Server에 연결정보 설정
const mysqlConnConfig = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "!Biz8080",
  database: "world",
};

// mysql db 연결하여 연결정보를 dbConnection 객체에 보관
const dbConnection = mysql.createConnection(mysqlConnConfig);
// 연결 객체(dbConnection)를 사용하여 DB연결
dbConnection.connect(() => {
  console.log("MySQL Connect OK");
});

export default dbConnection;

// const mysqlConnConfigCity = {
//   host: "localhost",
//   user: "root",
//   port: 3306,
//   password: "!Biz8080",
//   database: "city",
// };

// const dbConnectionCity =mysql.createConnection(mysqlConnConfigCity)

// dbConnectionCity = () =>{
//     console.log("city Connect OK")
// }
// export default dbConnectionCity
