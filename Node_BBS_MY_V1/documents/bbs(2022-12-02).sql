-- bbsDB, root 로그인
create database bbsDB;
use bbsDB;
/*
AUTO_INCREMENT 속성
	INSERT를 수행할 때 특별한 값이 없을 때 또는 0 일 때
	기존의 칼럼 값을 비교하여 1만큼 자동 증가된 값으로 채움
DEFAULT 속성
	INSERT를 수행할 때 특별한 값을 지정하지 않았을 때
	채워넣을 값 지정
(DATE_FORMAT(NOW(), '%Y-%M-%D'))
	현재 DB가 설치된 서버(컴퓨터)의 현재 시각을 가져와
    YYYY-MM-DD 형식의 문자열로 변환
NOT NULL	
default current_timestamp 
ON UPDATE current_timestamp    
최초 INSERT가 될 때 자동으로 현재 TIMESTAMP(시간 일련번호)를
날짜시각형태로 변경 저장
UPDATE가 될 떄 자동으로 현재 TIMESTAMP값으로 변경
*/
CREATE TABLE tbl_bbs (
b_seq	BIGINT	AUTO_INCREMENT	PRIMARY KEY,
b_date	VARCHAR(10)	NOT NULL 
DEFAULT	(DATE_FORMAT(NOW(), '%Y-%M-%D')),
b_time	VARCHAR(10)	NOT NULL 
DEFAULT	(DATE_FORMAT(NOW(), '%H:%i:%S')),
b_writer	VARCHAR(125)	NOT NULL	,
b_subject	VARCHAR(125)	NOT NULL	,
b_content	TEXT	NOT NULL	,
b_count	INT		,
b_update	DATETIME	NOT NULL	default current_timestamp ON UPDATE current_timestamp
);

DESC tbl_bbs;
/*
참조무결성 설정 (foreign key)
constraint f_bbs
foreign key (f_bseq) references tbl_bbs(b_seq)
tbl_bbs 테이블의 b_seq 칼럼과 현재 table의 f_bseq칼럼을
서로 연결하여 참조관계를 공고히 설정
tbl_bbs(b_seq)  				tbl_files(f_seq)
================================================
	있다 			=> 			있을 수 있다
    없다 			=>			절대 없다
반드시 존재			<=			있다
================================================
tbl_bbs 와 tbl_files간에 연결관계를 철저히 유지해
게시글이 없는데 첨부파일정보가 존재하는 것을 방지하는 목적
tbl_bbs에 키값이 있고, 그 키에 해당하는 연결정보가 tbl_files에 
있는 경우, 해당하는 데이터는 삭제, 키값의 update는 기본적으로 금지
on delete cascade
tbl_bbs의 어떤 데이터 삭제를 시도하는 경우
그 키값에 해당하는 데이터가 tbl_files에 있으면 같이 모두 삭제
on update cascade
키값을 변경하면 자동으로 같이 변경
UPDATE TBL_BBS
SET B_SEQ = 100
WHERE B_SEQ = 10; 이 명령을 시도하면
update tbl_files
set f_bseq = 100
where f_bseq = 10; 이 명령이 같이 실행

참조 무결성(foreign key) 설정은
1:n 관계 table에서 n의 table에 설정
1의 table은 pk 이어야 함
*/

create table tbl_files (
f_seq	BIGINT	AUTO_INCREMENT	,
f_bseq	BIGINT	NOT NULL	,
f_date	VARCHAR(10)	NOT NULL	DEFAULT
(DATE_FORMAT(NOW(), '%Y-%M-%D'))
,
f_time	VARCHAR(10)	NOT NULL	DEFAULT
(DATE_FORMAT(NOW(), '%H:%i:%S'))
,
f_original_name	VARCHAR(255)	NOT NULL	,
f_save_name	VARCHAR(255)	NOT NULL	,
f_ext	VARCHAR(10)	NOT NULL	,			
primary key(f_seq)	,
constraint f_bbs
foreign key (f_bseq) references tbl_bbs(b_seq)
on delete cascade
-- on update cascade
);

-- 이미 생성된 table간에 foreign key; 참조 무결성 설정
-- 단 이땐 두 table간에 EQ join이 성립될 시
alter table tbl_files add constraint f_bbs
foreign key(f_bseq) references tbl_bbs(b_seq)
on delete cascade;