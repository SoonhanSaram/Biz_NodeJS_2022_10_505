-- root 화면

Create database mybooks;
use mybooks;
create table if not exists tbl_books (
isbn	varchar(13)	PRIMARY KEY,
title	varchar(125)	,
link	varchar(255)	,
image	varchar(255)	,
author	varchar(125)	,
discount	INT	,
publisher	varchar(125)	,
description	TEXT	,
pubdate	varchar(20)	,
price	INT	
);

create table if not exists tbl_mybooks (
my_username	varchar(15)	not null,
my_isbn	varchar(13)	not null,
my_odate	varchar(15)	,
my_oprice	INT	,
primary key(my_username, my_isbn)	
);
drop table tbl_users;
alter table tbl_mybooks drop constraint f_userss;
create table if not exists tbl_users(
username	varchar(15)	not null	primary key,
password	varchar(13)	not null	,
u_name	varchar(125)	not null	,
u_tel	varchar(15)		,
u_addr	varchar(255)	,	
u_nickname	varchar(125)		,
u_level	INT);
/*
tbl_books : tbl_mybooks = 1:N
	사용자 3명이 001 이라는 도서를 구입했다면
    myBooks
		A 001
        B 001
        C 001
tbl_users : tbl_mybooks = 1:N

Foreign KEY 설정은 항상 N 테이블에 설정
*/

alter table tbl_mybooks -- N 의 테이블
add constraint f_books -- FK 이름 (임의)
foreign key (my_isbn) -- N 테이블의 연결 칼럼
references tbl_books(isbn) ;-- 1 테이블 정보 (PK)

alter table tbl_mybooks -- N 의 테이블
add constraint f_users -- FK 이름 (임의)
foreign key (my_username) -- N 테이블의 연결 칼럼
references tbl_users(username); -- 1 테이블 정보 (PK)

select * from tbl_mybooks;

insert into tbl_users (username, password, u_name, u_nickname ,u_level)  values ('kkm9596', '123', '김경민', '순한' , 0);

insert into tbl_users (username, password, u_name, u_nickname ,u_level)  values ('kkm4693', '123', '성춘향', '열녀' , 0);