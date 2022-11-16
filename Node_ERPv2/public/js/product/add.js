document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.product.input");
  const codeInput = document.querySelector("input[name='p_code']")
  const codeWarning = document.querySelector("div.failure-message")
  const btnList = document.querySelector("button.product.list")
  btnInput?.addEventListener("click", () => {
    const productInputs = document.querySelectorAll("input");
    for (input of productInputs) {
      const tagTitle = input.title;
      if (tagTitle) {
        const value = input.value;

        if (!value) {
          alert(`${tagTitle}을/를 입력해주세요`);
          input.select();
          return false;
        }
      }
    }
    if(codeInput.value.length != 13) {
      return codeWarning.classList.remove("hide") 
    }
    document.querySelector("form.product.write").submit();
  });
  // codeInput?.onkeyup = function () {
  //   if (isMoreThan13Length(codeInput.value)) {
  //     codeWarning.classList.remove('hide') 
  //   }
  //   else {
  //     codeWarning.classList.add('hide')     
  //   }
  // }
  btnList?.addEventListener("click", () => {
    document.location.href = "/product"
  })
  if (public_pcode) {
    formLegend.textContent = "상품정보 수정";
    // bcodeInput?.setAttribute("readonly", "readonly");
    codeInput.readonly = true;
    btnInput.style.backgroundColor = "#00AAAA";
    btnInput.textContent = "수정";
    ptnCodeCheck.disabled = true;
    ptnCodeCreate.disabled = true;
  }
});
