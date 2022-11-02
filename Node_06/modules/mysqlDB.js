import mysql from "mysql2";

const sqlConfig = {
    host : "localhost",    
    user : "root",
    password : "!Bizz8080",
    database : "schooldb"
};

const dbConnection = mysql.createConnection(sqlConfig);

export default dbConnection;