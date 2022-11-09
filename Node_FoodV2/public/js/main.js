const info = document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.today.input");
  const infos = document.querySelector("table.today");
  const inputs = document.querySelectorAll("input");
  btnInput?.addEventListener("click", () => {
    // alert("추가");
    const todayInputs = document.querySelectorAll("input");

    /**
     * for of
     * ES6에서 추가된 새로운 반복문
     *      for(let i = 0 ; i < 배열.length; i++) : 코드가 번거로움     *
     *      배열.forEach() : 동기화 오류를 가끔 범함
     *
     * 동기화 오류 예 :
     * 다음 코드에서 결과 1+2+3+4+5가 출력될 것으로 기대
     *      const 배열 = [1,2,3,4,5]
     *      let 합계 = 0
     *      배열.forEach(요소 =>{
     *        합계 += 요소})
     *      console.log(합계)
     *
     * 하지만 간혹 동기화 문제로 forEach()가 완성되기전에
     * console 출력이 먼저 실행되어 엉뚱한 결과를 내기도 함
     * 동기화 문제를 일으키지 않도록하기 위해 전통적 for()사용
     * 전통적 for()는 코드가 번거로움
     *
     * ES6에서 탄생한 새로운 for()명령문
     *      for( 요소 of 배열) {}
     */

    for (let tag of todayInputs) {
      const value = tag.value;
      if (!value) {
        alert(`값을 입력하세요\n
        "${tag.title}"`);
        tag.select(); // tag.focus()를 포함한다.
        return false;
      }
    }
    //end for
    // 유효성 검사가 끝나면 server로 데이터를 전송하기
    document.querySelector("form.today").submit();
  });
  // tag = "td"의 데이터 추출

  infos?.addEventListener("click", (tag) => {
    const target = tag.target;
    if (target.tagName === "TD") {
      // const input = ;
      alert(`${target.textContent}`);
    }
    const ParentTR = target.closest("TR");
    for (let [index, value] of inputs.entries()) {
      inputs.value = ParentTR.children().textContent;
    }
  });
});
