document.addEventListener("DOMContentLoaded", () => {
  const Generator = document.querySelector("button");
  let InputValue = document.querySelector("input");
  const chatLog = document.querySelector("#chat");
  const EXIT = document.querySelector("#exit");
  const KEY = localStorage.getItem("ID");
  const portNum = { home: "192.168.0.5", academy: "192.168.4.118" };
  const userList = document.querySelector(".userlist");

  const ws = new WebSocket(`ws://${portNum.home}:3000/chat/${KEY}`);
  let chattingog = [];
  let userLog = [];
  let roomID = "";
  let room = localStorage.getItem("roomId");
  room = room.split("/", 5);
  room = room[4];
  console.log(room);
  let msg = {
    type: "message",
    id: localStorage.getItem("ID"),
    roomId: room,
    text: InputValue.value,
  };
  ws.addEventListener("open", () => {
    ws.send(
      JSON.stringify({
        type: "enter",
        id: localStorage.getItem("ID"),
        roomId: room,
      })
    );
    ws.onmessage = (message) => {};
  });
  Generator.addEventListener("click", () => {
    const message = InputValue.value;
    console.log(KEY);
    ws.onopen = () => {
      ws.send("야 받아");
    };
  });

  EXIT.addEventListener("click", () => {
    ws.close(3000, "playerOut");
    InputValue.setAttribute("readonly", true);
  });

  ws.addEventListener("message", (chat) => {
    serverData = JSON.parse(chat.data);
    console.log(serverData);
    if (serverData.type === "id") {
      roomID = serverData.id;
      return false;
    }

    if (serverData.type === "enter") {
      userLog.push(serverData);
      userList.textContent = `참여 유저`;
      userLog.map((user, index) => {
        const name = document.createElement("span");
        name.innerText = `${index + 1} : ${user.username}`;
        userList.appendChild(name);
      });
    }
    if (serverData.type === "message") {
      chatLog.textContent = "";
      chattingog.push(serverData);
      chattingog.map((chating) => {
        const chatId = document.createElement("li");
        chatId.innerText = `${chating.id} : `;
        const chat = document.createElement("span");
        chat.innerText = chating.text;
        chatId.appendChild(chat);
        chatLog.appendChild(chatId);
      });
    }
  });

  InputValue.addEventListener("keydown", (e) => {
    const message = e.target.value;
    let msg = {
      type: "message",
      id: localStorage.getItem("ID"),
      roomId: room,
      text: message,
    };
    if (e.key === "Enter") {
      console.log(msg);
      ws.send(JSON.stringify(msg));
      e.target.select();
    }
  });
});
