-- root화면

create database puzzleDB;
use puzzleDB;

create table tbl_puzzle (
P_num	BIGINT auto_increment	PRIMARY KEY,
puzzle_name	VARCHAR(255)	NOT NULL	,
play_time	int	NOT NULL	
);
