# HTML RESTful API

- 표준 Ajax의 RESTful API는 XML또는 JSON 데이터를 Response
- xml 또는 JSON으로 받은 데이터는 client, 중간 서버에서 데이터를 parsing하여 원하는 모양으로 가공하는 작업을 수행할 수 있음
- 이 방식은 클라이언트, 중간 서버가 데이터를 parsing하여 view를 만드는데 많은 비용이 소모
- 그에 비해 HTML Response 데이터는 표준화되지 않았으나 클라이언트가 만드는 코드량을 매우 적게 구현할 수 있음

## HTML RESTFul API 구현

- 서버 Router의 응답 정보를 XML, JSON type이 아닌 HTML 화면 구현 코드로 응답
- 서버의 일반적인 HTTP 프로토콜을 활용하는 코드로
  기존의 사용하던 view(rendering)를 최소한으로 만들어 Response
- 표준 XML, JSON type에 비해 네트워크를 통해 전송되는 데이터양이 많아 질 수 있음
- 다른 용도로 데이터를 활용할 때 어려움
- 클라이언트 입장에선 복잡한 코드를 사용해 tag를
  생성, 데이터를 rendering하는 절차를 생략
  간단히 innerHTML 속성의 text데이터를 할당해
  화면을 구현
- 표준 RESTFul, HTML RESTFul 중 프로젝트 상황을
  고려 선택
