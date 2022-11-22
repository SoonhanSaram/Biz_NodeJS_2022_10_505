document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.buyer.input");
  const btnList = document.querySelector("button.buyer.list");
  const formLegend = document.querySelector("form.buyer.write legend");
  const bcodeInput = document.querySelector("input[name='b_code']");

  const btnCodeCheck = document.querySelector("button.buyer.code_check");
  const btnCodeCreate = document.querySelector("button.buyer.code_create");

  btnInput?.addEventListener("click", () => {
    // input에 title이 달려있는 경우에만
    // 진행하는 유효성검사 코드
    const buyerInputs = document.querySelectorAll("input");
    for (input of buyerInputs) {
      const tagTitle = input?.title;
      if (tagTitle) {
        const value = input.value;
        if (!value) {
          alert(`${tagTitle}을/를 입력해주세요`);
          input.select();
          return false;
        }
      }
    }
    document.querySelector("form.buyer.write").submit();
  }); //btnInsert end
  btnCodeCreate?.addEventListener("click", async () => {
    // alert(`거래처 코드 생성하기`);
    /**
     * 비동기방식으로 서버에 req
     */
    // res에는 서버에서 보낸 여러가지 데이터가 섞여있는 상태
    const res = await fetch("/buyer/get/bcode"); //비동기 통신
    // res 데이터에서 필요한 데이터(문자열)을 추출하기
    const bcode = await res.text();
    // alert(bcode);
    bcodeInput.value = bcode;
    document.querySelector("input[name='b_title']").select();
  });
  btnCodeCheck?.addEventListener("click", () => {
    // alert(`코드 중복검사`);
    const bcode = bcodeInput.value;
    if (!bcode) {
      alert("거래처코드를 입력하세요");
      bcodeInput.select();
      return false;
    }
    /**
     * 1. fetch 함수가 실행되고 web은 알아서 할 일을 함
     *    fetch가 즉시 "완료"처리를 함
     * 2. fetch는 서버로부터 응답을 기다리기
     * 3. 서버로부터 응답이 오면 then() 함수를 실행
     *    이 때 서버에서 전달된 response 정보를 res 변수에 담아서
     *    then() 함수에게 전달
     * 4. then() 함수는 res변수에서 json데이터만 추출하여 return
     * 5. 두번째 then()함수에게 json데이터를 전달
     */
    fetch(`/buyer/check/${bcode}`)
      .then((res) => res.json()) //.then (res => {return res.json()})
      .then((json) => {
        if (json.status) {
          alert(`${json.message}\n 다른 코드를 입력하세요`);
          bcodeInput.select();
        } else {
          alert(`사용가능한 코드입니다.`);
          document.querySelector("input[name='b_title']").select();
        }
      });
  });

  if (public_bcode) {
    formLegend.textContent = "거래처 정보 수정";
    // bcodeInput?.setAttribute("readonly", "readonly");
    bcodeInput.readonly = true;
    btnInput.style.backgroundColor = "#00AAAA";
    btnInput.textContent = "수정";
    btnCodeCheck.disabled = true;
    btnCodeCreate.disabled = true;
  }
});
