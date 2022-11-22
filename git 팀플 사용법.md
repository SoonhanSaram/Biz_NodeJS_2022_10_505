# callor 팀프로젝트 참여

1. 팀장이 README.md와 .gitignore를 포함하는 원격 Repository 생성
2. 각 팀원을 `settings/Collaborator` 에서 추가
3. 각 팀원은 각자의 git 화면에서 승인
4. 원격 Repository를 자신의 컴퓨터로 클론 : `git clone [주소] [로컬폴더]`
5. Branch 만들고 checkout하기
6. 자신의 branch에서 코드 작업
7. `git add . `, `git commit -m`, `git push origin [branch명]`
8. `pull request 하기`
9. 팀장은 각 request를 확인하여 `merge pull request` 실행
10. 로컬에서 master로 checkout
11. `git pull` : 원격 master 다운로드
12. `git checkout [branch명]`
13. `git merge master` : branch와 master파일 병합

## Branch만들기와 checkout하기

- branch 새로만들기 : `git branch [brach명]`
- branch로 작업영역 변환하기 : `git checkout [brach명]`
