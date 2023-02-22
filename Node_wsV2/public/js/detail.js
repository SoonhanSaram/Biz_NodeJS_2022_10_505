document.addEventListener("DOMContentLoaded", () => {
  const Generator = document.querySelector("button");
  let InputValue = document.querySelector("input");
  const chatLog = document.querySelector("#chat");
  const EXIT = document.querySelector("#exit");
  const KEY = localStorage.getItem("ID");
  const portNum = { home: "192.168.0.5", academy: "192.168.4.118" };
  const userList = document.querySelector(".userlist");

  const ws = new WebSocket(`ws://${portNum.academy}:3000/chat/${KEY}`);
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
    ws.close(4999, localStorage.getItem("ID"));
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

// maked code by A.I.

// document.addEventListener("DOMContentLoaded", () => {
//   const ws = new WebSocket(
//     `ws://localhost:3000/chat/${localStorage.getItem("ID")}`
//   );
//   const chatLog = document.querySelector("#chat");
//   const userList = document.querySelector(".userlist");
//   let chattingog = [];
//   let userLog = [];

//   // When the WebSocket connection is opened, send a message to enter the chat room
//   ws.addEventListener("open", () => {
//     ws.send(
//       JSON.stringify({
//         type: "enter",
//         id: localStorage.getItem("ID"),
//         roomId: localStorage.getItem("roomId"),
//       })
//     );
//   });

//   // Listen for messages from the server and update the chat log or user list accordingly
//   ws.addEventListener("message", (event) => {
//     const data = JSON.parse(event.data);

//     if (data.type === "id") {
//       // Store the room ID that the server sends back
//       localStorage.setItem("roomId", data.id);
//     } else if (data.type === "enter") {
//       // Add the new user to the user log and update the user list
//       userLog.push(data);
//       userList.textContent = `참여 유저`;
//       userLog.forEach((user, index) => {
//         const name = document.createElement("span");
//         name.innerText = `${index + 1} : ${user.username}`;
//         userList.appendChild(name);
//       });
//     } else if (data.type === "message") {
//       // Add the new message to the chat log and update the display
//       chattingog.push(data);
//       chatLog.textContent = "";
//       chattingog.forEach((message) => {
//         const chatId = document.createElement("li");
//         chatId.innerText = `${message.id} : `;
//         const chat = document.createElement("span");
//         chat.innerText = message.text;
//         chatId.appendChild(chat);
//         chatLog.appendChild(chatId);
//       });
//     }
//   });

//   // When the user enters a message and hits Enter, send it to the server
//   document.querySelector("input").addEventListener("keydown", (event) => {
//     if (event.key === "Enter") {
//       const message = event.target.value;
//       const roomId = localStorage.getItem("roomId");
//       const id = localStorage.getItem("ID");
//       const data = { type: "message", id, roomId, text: message };
//       ws.send(JSON.stringify(data));
//       event.target.value = "";
//     }
//   });

//   // When the user clicks the exit button, close the WebSocket connection
//   document.querySelector("#exit").addEventListener("click", () => {
//     ws.close(4999, localStorage.getItem("ID"));
//   });
// });
