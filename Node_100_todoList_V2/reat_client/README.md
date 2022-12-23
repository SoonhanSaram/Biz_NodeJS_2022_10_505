# TodoList

# React 를 사용하여 할일 리스트 작성하기

- 기본기능
- 할일 추가하기
- 할일 완료하기
- 할일 삭제하기
- 할일 수정하기
- localStorage 를 사용하여 브라우저에 데이터 저장하기
- Nodejs 서버와 연동하여 DB 에 저장하기

# 추가 Dependency

` npm install moment ``` 
```npm install react-uuid `

## state 끌어 올리기

- TodoInput.js에는 TodoContent state가 있음
- 단순히 insert만 추가할 때는 문제 없음
- TodoItem에 있는 항목을 클릭했을 때, 클릭된 항목을 TodoInput에서 보여주고, 내용을 변경하고
  저장을 하면 다시 TodoList에 Update를 해야함
- TodoInput에 있는 state와 TodoItem의 데이터를 서로 공유해야하는 상황 발생
- TodoInput에 선언된 TodoContent state를 TodoMain으로 끌어올리기 해 전체
  component들이 공유 할 수 있도록 만들어주기

## Client/Server 방식으로 변경

- 메모리 구현방식의 todoList를 Server와 연동하여 Client Front Back Project로 구현
- React Project를 Client로 NodeJS Project를 Server방식으로 구현
- 현재 NodeJS 서버가 port 3000에서 실행 중 React를 단순히 시작하면
  port 3000으로 실행되거나, 충동을 감지해 자동으로 임의의 port로 변경 될 것
- React의 실행 port 변경
- package.json의 다음 항목을 추가

```
"script" :  {
    "window" : "set PORT=5000 && react-script start",
    "mac" : "export PORT=5000 && react-script start",
    "linux" : "export PORT=5000 && react-script start"
}
```

## React 프로젝트 자동 빌드

- NodeJS와 React를 연동하면, React는 항상 Build가 된 상태로 유지
- React 소스코드를 변경하면 Build에 자동반영 되지 않음
- nodemon을 사용해 자동 build 실행

## Nodemon을 사용해 자동 빌드

- `nodemon ignore`만들기 : `nodemon.json` ; nodemon은 파일이 저장되면 자동 재실행되나
  재실행되는 것을 방지하는 설정

```json
{
  "ignore": ["build", "nodemon,json"]
}
```

- nodemon을 자동빌드 옵션으로 실행

```bash
nodemon --exec "react-scripts build"
```
