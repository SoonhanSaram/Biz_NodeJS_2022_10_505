document.addEventListener("DOMContentLoaded", () => {
  const Generator = document.querySelector("button");
  let InputValue = document.querySelector("input");

  Generator.addEventListener("click", () => {
    InputValue = InputValue.value;
    const ws = new WebSocket(`ws://localhost:3000/rooms`);
    ws.onopen = () => {
      alert("채팅방이 생성되었습니다.");
    };
  });

  InputValue.addEventListener("keydown", (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      const ws = new WebSocket(`ws://localhost:3000/rooms`);
      ws.send("InputValue");
      // document.location.href = `/chat/${InputValue}`;
    }
  });
});
