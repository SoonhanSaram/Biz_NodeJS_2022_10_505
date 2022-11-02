# Node_04 Project

- NodeJS + Express + MySQL 연동 프로젝트

## Express Server를 만드는데 도움을 주는 도구들 설치

- path 정보를 만드는 도구 : `npm install -save path`
- logger(추적정보)를 쉽게 관라할 수 있는 도구 : `npm install -save morgan`

## Express View Template 설정

- NodeJS + Express 프로젝트에서 자체 View 화면만들기
- EJs(Embeded Javascript View) : html과 JS가 결합된 특별한 화면 구현 도구
- ejs template 컴파일 도구 : `npm install -save ejs`
- ejs file 만들기 :`project/views`폴더에 \*.ejs이름으로 파일 생성
- ejs file은 기본구조가 html5와 같다
- html5에서 사용하는 모든 tag, css, js까지 모두 그대로 사용할 수 있다.
- 기본적인 html5 문서에 JS코드를 삽입하여 html과 데이터를 rendering하는 형식의 코드를 만든다
- router에서는 데이터가 준비되면 res.render("ejs파일명", JSON파일)함수를 사용하여 ejs파일과 JSON객체 데이터를 묶어서 rendering한 후 client로 response한다
