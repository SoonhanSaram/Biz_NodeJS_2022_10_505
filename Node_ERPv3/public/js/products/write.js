document.addEventListener("DOMContentLoaded", () => {
  const btnList = document.querySelector("div.products.button.box");
  const inputs = document.querySelectorAll("input");
  const formProduct = document.querySelector("form.products");

  const varriable = () => {
    for (const input of inputs) {
      const inputTitle = input?.title;
      if (inputTitle) {
        const value = input?.value;
        if (!value) {
          const labelName = input
            .closest("DIV")
            .querySelector("label").textContent;
          alert(`필수 입력항목 입니다 \n ${labelName}`);
          input.select();
          return false;
        }
      }
    }
    return true;
  };

  btnList?.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON") {
      const className = Array.from(target.classList);
      // tag의 class 이름에 input포함돼 있으면
      if (className.indexOf("input")) {
        if (!varriable()) return false;
        formProduct.submit();
      } else if (className.indexOf("list")) {
        document.location.href = "/products";
      }
    }
  });
});
