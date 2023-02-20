import { useEffect, useRef, useState } from "react";
import { useWSContext } from "../context/WSProvider";
import { useNavigate } from "react-router-dom";
const WaitingRoom = () => {
  const navigate = useNavigate();
  const { socket, setSocket } = useWSContext();
  const [inputValue, setInputValue] = useState("");
  const [roomList, setRoomList] = useState([]);
  const inputRef = useRef();
  const onClick = () => {
    socket.send(JSON.stringify({ type: "roomId", roomId: inputValue }));
  };

  const clickHandler = (room) => {
    navigate(`/chat/${room}`);
  };
  const refresh = () => {
    console.log("새로고침");
  };
  useEffect(() => {
    if (socket) {
      socket.send(JSON.stringify({ type: "roomList" }));
      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        setRoomList(data);
      };
    }
  }, [socket, refresh()]);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const roomView = roomList?.map((room, index) => (
    <ul
      key={index}
      onClick={() => {
        clickHandler(room);
      }}
    >
      <li>{room}</li>
    </ul>
  ));
  return (
    <div className="flex flex-col">
      <span className="mt-12">방 목록</span>
      <div>{roomView}</div>
      <div className="flex m-auto">
        <input
          placeholder="방 이름입력"
          value={inputValue}
          onChange={onChange}
          ref={inputRef}
        />
        <div className="hover:cursor-pointer" onClick={onClick}>
          방 만들기
        </div>
        <div onClick={refresh}>새로고침</div>
      </div>
    </div>
  );
};

export default WaitingRoom;
