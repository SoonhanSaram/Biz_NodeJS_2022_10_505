# TodoList Rest server

## dependency update

```
npm install -s cookie-parser
npm install -s debug
npm install -s express
npm install -s http-errors
npm install -s morgan
npm install -s mysql2
npm install -s pug
npm install -s sequelize
```

## Sequelize를 사용하여 model정보 생성하기

```
sequelize-auto -d todo -h localhost -u root -x '!Biz8080'
sequelize-auto --database todo --host localhost --user root --pass '!Biz8080'
```

## todoList CRUD

- `GET /todo/` : 전체 리스트 조회
- `GET /todo/:id` : id에 해당하는 데이터 조회
- `POST /todo/insert` : 데이터 추가
- `PUT /todo/update` : 데이터 업데이트
- `DELETE /todo/delete` : 데이터 삭제

## NodeJS Server & React Client 통합

- React 프로젝트를 NodeJS 프로젝트에 복사
- `React-client`로 이름 변경