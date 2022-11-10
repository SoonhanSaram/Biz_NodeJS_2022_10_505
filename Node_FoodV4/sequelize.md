# sequelize 사용하기

- sequelize MySQL, MariaDB, SQLitem MSSQL-Server, Postgress, Oracle 등을 위한 NodeJS ORM(Object Relational Mapping) 이다

* sequelice-cli를 설치하기

```
(windows) 관리자 권한으로 cmd창에서
npm install -g sequelize-cli
```

- 프로젝트에 sequelize dependecy 다운로드
  `npm install -save sequelize`

* 생성된 프로젝트에서 설정하기
  `sequelize init`

* migrations 폴더와 seeder 폴더가 비어있기 때문에 git push 할 때 폴더가 업로드 되지 않는다. 이 폴더에 임의의 파일을 하나씩 생성해 두자

## ORM(Object Relational Mapping)

- SQL을 사용하지 않고, 객체와 연결하여 RDBMS CRUD를 구현하는 도구
- 자체 지원하는 객체, 함수 등을 사용하여 CRUD를 쉽게 구현하는 도구
- 내부적으로 함수 명령을 SQL로 변환하여 RDBMS와 통신
