# NodeJS 와 React 의 연동

- NodeJS Project root 폴더에서 react Project 를 생성한다
- React Project의 root 에 nodemon.js 파일을 생성하고 다음 코드 작성

```js
{
    "ignore" : ["build","nodemon.json"]
}
```

- react 를 start 할 때 다음의 명령으로 시작
  `nodemon --exec "react-scripts build" --watch *.css --watch *.js `
- 위 명령은 실제 react 를 start 하지 않고, nodemon 을 통해 소스코드의 변화를 감시만
  하고 있도록 하는 것
- nodemon 은 react 프로젝트 폴더의 파일들을 감시하고 있다가 파일의 변화(저장) 가
  감지되면 자동으로 build script 를 실행
