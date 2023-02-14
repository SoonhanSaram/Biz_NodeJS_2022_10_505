document.addEventListener("DOMContentLoaded", () => {
  const Generator = document.querySelector("button");
  let InputValue = document.querySelector("input");
  let msg = {
    type: "message",
    text: InputValue.value,
    id: "테스트1",
    date: Date.now(),
  };
  Generator.addEventListener("click", (e) => {
    InputValue.value;
    if (InputValue) {
      localStorage.setItem("ID", InputValue);
      document.location.href = `/chat/${InputValue}`;
    } else {
      alert("아이디를 입력해주세요");
      InputValue.focus();
    }
  });

  InputValue.addEventListener("keydown", (e) => {
    InputValue = e.target.value;
    if (e.keyCode === 13) {
      if (InputValue) {
        localStorage.setItem("ID", InputValue);
        document.location.href = `/chat/${InputValue}`;
      } else {
        alert("아이디를 입력해주세요");
        e.focus();
      }
    }
  });
});
