# 나라상사 ERP 프로젝트

- since 2022-11-11

## 거래처관리 프로젝트

- ERP 프로젝트를 수행하기 위한 거래처정보를 등록, 수정, 삭제하는 기능 구현
- Table 명세 설계, ERD(Entity Relation Diagram) 작성
- ERPDBV2 database 생성, tbl_buyer table 생성
- 프로젝트에서 사용할 model 파일을 생성하기
  ```
  관리자 권한으로 cmd창 열어서
  npm install -g sequelize-auto
  npm install -g mysql2
  ```
  ```
  npm install
  ```
  ```
  sequelize-auto -d erpDBV2 -h localhost -u root -x !Biz8080
  ```

https://cssgradient.io/
