const portNum = { home: "192.168.0.5", academy: "192.168.4.118" };
const socket = new WebSocket(`ws://${portNum.academy}:3000/rooms`);

socket.addEventListener("open", () => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // console.log(data)
    const { type, data: payload } = data;
    console.log(payload);
    if (type === "id") {
      localStorage.setItem("id", payload);
    } else if (type === "rooms") {
      const roomList = document.querySelector("#room-list");
      roomList.innerHTML = "";
      payload.forEach((room) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = room.roomId;
        a.href = `/chat/${room.roomIp}`;
        a?.addEventListener("click", () => {
          socket.close(3000, "채팅방입장");
        });
        const roomIp = a.href;
        localStorage.setItem("roomId", roomIp);
        li.appendChild(a);
        roomList.appendChild(li);
      });
    }
  };
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = document.querySelector('input[name="id"]').value;
  localStorage.setItem("ID", id);
  const ip = localStorage.getItem("id");
  // server 에서 원하는 정보를 보내주기

  socket.send(JSON.stringify({ roomId: id, roomIp: ip }));
  console.log(id, ip);
  // window.location.href = "/chat";
});
