# RESTFul API

- 둘 이상의 다수간의 인터넷을 통해 정보를 안전하게 교환 (Exchange)하기위해 사용하는 인터페이스

## REST

- Representational State Transfer
- API의 작동 방식에 대한 조건을 부과하는 소프트웨어 아키텍트

1. 균일한 인터페이스
2. 무상태(Stateless)
3. 계층화된 시스템
4. 캐시 가능성

## RESTFul의 Request Method

- 고전적인 HTTP에선 GET, POST 방식만 존재
- REST API에선 PUT, DELETE, 등과 같은 할 일을 명확히 명시하는 Request Method가 사용
- HTML form에선 기본적으로 GET과 POST만 사용
- REST의 모든 Request Method를 사용하기 위해선
  Ajax방식으로 API와 요청을 구현해야 함

### GET Method

- API server에게 RESTful 방식으로 데이터를 요청할 때
- 이 떄 요청하는 데이터에 대한 조건(값)을 추가하여 보내기 가능
- 서버는 데이터를 XML, JSON, HTML 방식으로 Response

### Post Method

- API server에 데이터를 추가(insert)해 줄 것을 요청 할 떄
- 보통 form tag의 input tag에 데이터를 담아서 서버로 전송
- 서버는 데이터를 추가하고, 결과(성광, 실패 여부)를 Response

### PUT Method

- API server에 기존 데이터를 변경(Update)해 줄 것을 요청할 떄
- 기존의 전통적인 HTML방식으론 어려움
- Ajax(Asynchoronous javascript and Xml; 비동기 통신) 방식으로 요청
- 서버는 Update된 결과를 Response
- PUT 방식은 POST와 마찬가지로 http프로토콜의 Body에 데이터를 담아서 전달

### DELETE Method

- API server에게 특정 key값을 보내면서 해당 key의 데이터를 삭제하도록 요청
- Ajax 방식으로 요청
- 서버는 Delete후에 결과를 Response

## 통신, 컴퓨터와 컴퓨터간 인터페이스(Interface)

- 표준화된, 공통 프로토콜을 사용하여 정보를 주고 받는 통로
- 컴퓨터-컴퓨터는 네트워크를 통해서 인터페이스가 구현
- 컴퓨터내의 App과 App은 운영체제의 메모리, 프로세서 등을 통해 구현
- 키보드와 모니터를 통해 컴퓨터와 사용자간의 인터페이스를 Man Machine Interface라 함
- UI/UX : Man machine Interface

## API : Application Programming Interface

- 컴퓨터와 컴퓨터간, App과 App간의 약속된 데이터 교환 규약, 계약, 규칙
