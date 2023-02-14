document.addEventListener("DOMContentLoaded", () => {
  const Generator = document.querySelector("button");
  let InputValue = document.querySelector("input");

  Generator.addEventListener("click", () => {
    const KEY = localStorage.getItem("ID");
    const message = InputValue.value;
    console.log(KEY);
    console.log("object");
    const ws = new WebSocket(`ws://localhost:3000/chat/${KEY}`);
    ws.onopen = () => {
      alert("메시지 전송");
      ws.send(message);
      ws.onmessage((chat) => {
        console.log(chat.data);
      });
    };
  });
});
