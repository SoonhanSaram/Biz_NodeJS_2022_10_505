# NodeJS BBS, Pagination 구현

- NodeJS, Express, MySQL 을 사용한 Pagination 구현하기
- `express-pagination` 3rd party library 를 사용하지 않고
  pagination 기본 원리를 이해를 위해 자체적 제작

## Dependecies

- `sequelize, mysql2` 를 사용해서 구현

## pagination 구현 방법

### client 에서 보고자 하는 페이지번호를 서버에 요청한다

### server 에서는 전달받은 페이지번호를 기준으로 다음 연산을 수행한다

- 전체 데이터가 몇 개인지 검사
- 전체 데이터 개수를 화면에 보여질 데이터 개수로 나누기
- 이 결과에 의해서 데이터가 몇 페이지 짜리인지 알 수 있다.
- 전달받은 `페이지번호 - 1 * 보여질 개수` 를 가지고 offset 계산
- `보여질 개수`만큼 limit 하기
- `offset` 과 `limit` 값을 기준으로 `select` 하기
- select 한 데이터를 Response 하기

### 화면을 그리기 위한 데이터 연산

- 전달받은 페이지번호를 기준으로 화면에 보여질 `페이지번화 nav` 데이터 구하기
- 맨 끝으로 가기 페이지번호 구하기
