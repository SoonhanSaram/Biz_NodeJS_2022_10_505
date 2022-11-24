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

## Nodejs에서 시간관련 핸들링하기

- 기본적으로 Date클래스를 사용할 수 있지만, 기능이 미약하여
  날짜와 관련된 이슈가 있어 별도의 3rd party를 사용
- JS와 관련하여 가장 많이 사용되는 moment사용
  `npm install -save moment`
