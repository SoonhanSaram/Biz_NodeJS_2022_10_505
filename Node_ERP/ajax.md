# AJAX(asyncronouse, JavaScript and XML) : 비동기 서버 요청

- 일반적인 http프로토콜은 서버에 Request를 보내고, 서버에서 연산이 수행된 다음
  Response가 될 때까지 기다린
- Request를 보내고 Response가 되는 순간 현재 보고있는 화면은 Refresh된다
- 만약 Response가 늦어지면 화면은 계속 정지된 것처럼 응답을 기다리고 있는다
- 화면 전체에 대한 요청이아닌 단순한 몇 개의 데이터를 요청하고 응답을 받기 위해 일반적인
  HTTP 프로토콜을 통해 수행하는 것은 다소 낭비 요소가 있다.
- 현재 화면을 그대로 유지하면서 내부에서 작은 연결 Connection이 만들어지고 이 Connetion을
  통해서 서버에 요청을 보내고, 응답을 받은 후 처리를 할 수 있도록 구성된 기능이 AJAX다
