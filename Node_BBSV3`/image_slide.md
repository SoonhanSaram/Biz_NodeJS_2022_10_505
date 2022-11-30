# Image 슬라이드 구현 원리

## Box Layout : mask box

- 한 개의 이미즈를 보여줄 box를 설정 : div.image
- 이 box의 width와 height를 한 개의 이미지 크기와
  일치시킴
- 이 box 내부에 이미지를 배치하고, display 속성을
  flex로 설정
- 이 box 크기와 관계없이 이미지들은 자신의 크기를
  유지하며 가로방향으로 나열
- 이 box의 overflow를 hidden해 한 개의 이미지만
  보이도록 설정

## slide 구현

- 이미지 한 개의 width만큼 오른쪽으로 계속해서
  이동하는 애니메이션 구현
- 0% : 시작할 때 위치 `transform: translateX(0);`
- 100% : 종료될 때 위치 `transform: translateX(calc(-200px * 5));`

* calc() 함수 : css에서 px값을 %로 바꿔주는 함수
