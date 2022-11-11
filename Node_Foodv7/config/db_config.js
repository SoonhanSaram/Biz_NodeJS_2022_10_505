export default {
  development: {
    username: "root",
    password: "!Biz8080",
    database: "fooddb",
    host: "127.0.0.1",
    dialect: "mysql",
    //  logging : true 가 기본값이다, SQL명령실행 내용을 console에 출력
    //  sequelize 최근 버전에서는 true로 설정하면 경고메시지 출력
    //  true로 설정하지 않고 속성을 주석처리하여 사용
    //  false로 할 때만 사용
    // logging: true,
  },
  test: {
    username: "root",
    password: "!Biz8080",
    database: "fooddb",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "!Biz8080",
    database: "fooddb",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
