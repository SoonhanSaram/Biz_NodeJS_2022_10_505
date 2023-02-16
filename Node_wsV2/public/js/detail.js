document.addEventListener("DOMContentLoaded", () => {
  const Generator = document.querySelector("button");
  let InputValue = document.querySelector("input");
  const chatLog = document.querySelector("#chat");
  const EXIT = document.querySelector("#exit");
  const KEY = localStorage.getItem("ID");
  const portNum = { home: "192.168.0.5", academy: "192.168.4.118" };

  const ws = new WebSocket(`ws://${portNum.academy}:3000/chat/${KEY}`);
  let log = [];
  let roomID = "";
  let msg = {
    id: localStorage.getItem("ID"),
    text: InputValue.value,
    room: roomID,
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

  EXIT.addEventListener("click", () => {
    ws.close(3000, "playerOut");
    InputValue.setAttribute("readonly", true);
    console.log(InputValue.attributes);
  });
  ws.addEventListener("message", (chat) => {
    chatLog.textContent = "";

    serverData = JSON.parse(chat.data);
    if (serverData.type === "id") {
      roomID = serverData.id;
      return false;
    }

    log.push(chat.data);
    console.log(log);
    log.map((chating) => {
      const Chat = document.createElement("li");
      Chat.style.listStyle = "none";
      Chat.innerText = chating;
      chatLog.appendChild(Chat);
    });
  });

  InputValue.addEventListener("keydown", (e) => {
    const message = e.target.value;
    let msg = {
      id: localStorage.getItem("ID"),
      text: message,
      date: Date.now(),
      room: roomID,
    };
    if (e.keyCode === 13) {
      console.log(msg);
      ws.send(JSON.stringify(msg));
      e.target.select();
    }
  });
});
