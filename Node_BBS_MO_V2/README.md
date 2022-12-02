# NodeJs MongoDB 프로젝트

- NodeJS Express와 MongoDB를 연동하여 게시판 CRUD 구현하기

- NodeJS에서 MongoDB와 연동을 할 때는 대부분의 프로젝트에서 mongoose를
  사용하여 ORM방식으로 접근

- mongoose를 사용한 orm 방식으로 mongodb 프로젝트 구현

## Dependecy 설정

`npm install -save mongodb`
`npm install -save mongoose`

## 보안 주의사항

- mongodb atlas cluster를 사용하는 관계로 atlas 접속 url이 노출될 수 있음
  atlas URL이 담겨진 config/mongodb.js파일을 git hub에 업로드 되지 않도록
  .gitignore에 설정
