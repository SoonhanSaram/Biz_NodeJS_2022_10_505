# ORM을 사용한 DBMS 핸들링

- 일반적인 CRUD는 SQL을 사용하지 않아도 자체 지원되는 객체, 함수를 사용하여 매우 쉽게 구현할 수 있다.
- 이 때는 각 ORM도구가 요구하는 문법대로 model 객체를 만들고 model객체를 사용하여 CRUD를 구현한다.
- 복잡한 조건을 부여하여 조회(SELECT)를 할 떈 일반적인 SQL을 사용하는 것보다 더 어려워질 수 있다.

## Sequelize

- MySQL, MariaDB, Postgress 등의 DBMS를 ORM방식으로 핸들할 수 있다.
- 초기 model을 만드는 과정이 있으나, 한 번 만들어 두면
  이후의 코드가 매우 간소해 진다.

## mongoose

- mongoDB NoSQL을 ORM방식으로 사용할 수 있는 3rd party Library
- 매우 강력한 기능을 제공하고 NoSQL DBMS를 마치 RDBMS를 사용하는 것처럼 착각하게 만든다.
