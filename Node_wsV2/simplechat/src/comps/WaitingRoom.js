import { useEffect, useRef, useState } from "react";
import { useWSContext } from "../context/WSProvider";
import { useNavigate } from "react-router-dom";
const WaitingRoom = () => {
  const navigate = useNavigate();
  const { socket, setSocket, roomId, setRoomId, users, setUsers } =
    useWSContext();
  const [inputValue, setInputValue] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const inputRef = useRef();
  const onClick = () => {
    socket.send(JSON.stringify({ type: "roomId", roomId: inputValue }));
  };

  const clickHandler = (room) => {
    socket.send(JSON.stringify({ type: "join", room }));
    setRoomId(room);
    navigate(`/chat/${room}`);
  };
  const refreshHandler = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    if (!socket) navigate("/");
  }, []);
  useEffect(() => {
    if (socket) {
      socket.send(JSON.stringify({ type: "roomList" }));
      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        setRoomList(data);
      };
    }
  }, [socket, refresh]);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const roomView =
    roomList.length > 0
      ? roomList.map((room, index) => (
          <ul
            className="border-y-[1px] border black cursor-pointer hover:bg-cyan-700 hover:text-white"
            key={index}
            onClick={() => {
              clickHandler(room);
            }}
          >
            <li>{room}</li>
          </ul>
        ))
      : null;
  return (
    <div className="flex flex-col max-w-[15%] mx-auto">
      <span className="mt-12 ">방 목록</span>
      <div className="h-96 overflow-auto border-2 border-cyan-500">
        {roomView}
      </div>
      <div className="flex m-auto border-y-[1px] border-l-2 border-black">
        <input
          placeholder="방 이름입력"
          value={inputValue}
          onChange={onChange}
          ref={inputRef}
        />
        <div
          className="hover:cursor-pointer border-x-2 border-black"
          onClick={onClick}
        >
          방 만들기
        </div>
        <div
          className="hover:cursor-pointer border-r-2 border-black"
          onClick={refreshHandler}
        >
          새로고침
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
