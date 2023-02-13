document.addEventListener("DOMContentLoaded", () => {
  const Generator = document.querySelector("button");
  let InputValue = document.querySelector("input");

  Generator.addEventListener("click", () => {
    InputValue = InputValue.value;
    const ws = new WebSocket(`ws://localhost:3000/chat`);
    ws.onopen = () => {
      alert("메시지 전송");
    };
    console.log(InputValue);
    ws.send(InputValue);
  });
});
