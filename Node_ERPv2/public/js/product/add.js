document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.product.input");

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
    document.querySelector("form.product.wirte").submit();
  });
});
