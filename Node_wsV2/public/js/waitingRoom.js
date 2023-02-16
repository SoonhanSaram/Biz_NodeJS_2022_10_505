const portNum = { home: "192.168.0.5", academy: "192.168.4.118" };
const socket = new WebSocket(`ws://${portNum.academy}:3000`);

socket.addEventListener("open", () => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    const { type, data: payload } = data;

    if (type === "id") {
      localStorage.setItem("id", payload);
    } else if (type === "rooms") {
      const roomList = document.querySelector("#room-list");
      roomList.innerHTML = "";
      payload.forEach((roomId) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = roomId;
        a.href = `/chat/${roomId}`;
        li.appendChild(a);
        roomList.appendChild(li);
      });
    }
  };
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = document.querySelector('input[name="id"]').value;
  localStorage.setItem("id", id);
  // server 에서 원하는 정보를 보내주기
  // socket.send()
  // window.location.href = "/chat";
});
