# Node_02 프로젝트

- `NodeJS`와`express` 연동한 web application server```
- `mySQL`을 연동한 `DB 연동 application`

## 프로젝트 구현을 위한 Dependencies 설정

1. express 설정 : `npm install -save express`
2. mySQL 설정 : `npm install -save mysql2`  
   MySQL 8.0.x Server와 연동하기 위하여 mysql2를 사용

## 프로젝트 설정 변경

### package.JSON 설정 변경

- "main" : "index" 설정 변경 > `"main"`: `"./bin/www.js"`
- commonsJS를 module 형식으로 변경 : `"type" : "module"` 항목추가
- start script 추가 : script 항목에 다음 추가  
  `"start" " "npm ./bin/www.js"`

  ### NodeJS, Express module 분리하기

  #### Module 생성하기

  ```
  const 모듈 = () => {};
  export default 모듈
  ```

  ```
  const 모듈 = 다른 모듈의 함수()
  export default 모듈

  예
  import express from "express"
  const app = express()
  export default app
  ```

  #### router module 분리하기
  * router 모듈은 express에서 여러가지 Request를 ㅊ퍼리하기 위한 모듈
  * router 모듈은 app.js에서 선언을 한다
  * router 모듈을 모두 app.js 에서 선언을 하게되면 app.js가 너무 복잡한 코드가 된다
  * router 모듈을 분리하여 각 역할별로 처리하도록 한다
  1. ```routes``` 폴더 생성
