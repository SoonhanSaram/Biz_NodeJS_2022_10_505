document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.buyer.input");
  const btnList = document.querySelector("button.buyer.list");

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
      document.querySelector("form.buyer.write").submit();
    }
  });
});
