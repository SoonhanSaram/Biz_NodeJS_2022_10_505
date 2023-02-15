document.addEventListener("DOMContentLoaded", () => {
  const Generator = document.querySelector("button");
  let InputValue = document.querySelector("input");
  const chatLog = document.querySelector("#chat");
  const EXIT = document.querySelector("#exit");
  const KEY = localStorage.getItem("ID");
  const ws = new WebSocket(`ws://192.168.4.118:3000/chat/${KEY}`);
  let log = [];
  let msg = {
    id: "테스트1",
    text: InputValue.value,
    date: Date.now(),
  };

  Generator.addEventListener("click", () => {
    const message = InputValue.value;
    console.log(KEY);
    ws.onopen = () => {
      alert("메시지 전송");
      ws.onmessage((chat) => {
        console.log(chat.data);
      });
    };
  });

  InputValue.addEventListener("keydown", (e) => {
    const message = e.target.value;
    let msg = {
      id: "테스트1",
      text: message,
      date: Date.now(),
    };
    if (e.keyCode === 13) {
      ws.send(JSON.stringify(msg));

      e.target.select();
    }
  });

  EXIT.addEventListener("click", () => {
    ws.close(3000, "playerOut");
    InputValue.setAttribute("readonly", true);
    console.log(InputValue.attributes);
  });
  ws.addEventListener("message", (chat) => {
    chatLog.textContent = "";
    log.push(chat.data);
    log.map((chating) => {
      const Chat = document.createElement("li");
      Chat.style.listStyle = "none";
      Chat.innerText = chating;
      chatLog.appendChild(Chat);
    });
  });
});
