const arry = [];
for (let i = 0; i < 9999; i++) {
  const rnd = Math.floor(Math.random() * 100) + 1;
  arry[i] = rnd;
}

console.log(arry);

let sum = 0;
arry.forEach((item) => {
  sum += item;
});

console.log("합계 : ", sum);

sum = 0;
for (let i = 0; i < arry.length; i++) {
  sum += arry[i];
}
console.log("합계 : ", sum);

sum = 0;
for (let item of arry) {
  sum += item;
}

console.log("합계 : ", sum);

/**
 * 비동기 실행 : 일반적인 JS코드 (함수들)이 실행되는 방식
 *
 */
// JS이외의 동기식 프로그래밍에서는 다음 코드가 순서대로 진행
// 정상적으로 변수들이 전달된다
const 주문 = 커피주문받기();
const 커피 = 커피제조(주문);
const 포장 = 커피받기(커피);
const 결과 = 커피마시기(포장);

// JS에서는 비동기적으로 실행되는 함수들이 많다
// 비동기함수에서 앞에서 실행된 결과를 다음 코드에서 사용하려고 할 떄
// 다음과 같은 CallBack Code가 만들어짊
// 이러한 현상을 CallBack Hell이라고 한다.
let result = 0;
{
  커피주문받기(),
    (주문) => {
      {
        커피제조(주문),
          (커피) => {
            커피받기(커피),
              (커피컵) => {
                커피마시기(커피컵),
                  (결과) => {
                    result = 결과;
                  };
              };
          };
      }
    };
}

{
  async () => {
    const 주문 = await 커피주문();
    const 커피 = await 커피제조(주문);
    const 포장 = await 커피받기(커피);
    const 결과 = await 커피마시기(포장);
    console.log("커피 다 마셨다", 결과);
  };
}
