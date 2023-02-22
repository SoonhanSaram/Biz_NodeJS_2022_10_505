import { useEffect, useRef, useState } from "react";
import { useWSContext } from "../context/WSProvider";
import { useNavigate } from "react-router-dom";
const ChatRoom = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const change = (e) => setMessage(e.target.value);
  const { socket, roomId } = useWSContext();
  const inputRef = useRef();
  const pressEnter = (e) => {
    if (e.key === "Enter") {
      socket.send(JSON.stringify({ type: "chat", message }));
      setMessage("");
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    if (!socket) navigate("/");
  }, []);
  useEffect(() => {
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(data);
      if (data.type === "users") {
        setUsers((users) => [...users, ...data.users]);
        console.log(users);
        return false;
      } else setChat((chat) => [...chat, data]);
    };
  }, [socket]);

  const usersView =
    users.length > 0
      ? users.map((user, index) => {
          return (
            <span>
              {index + 1}. {user}
            </span>
          );
        })
      : null;

  const messageView = chat?.map((ch, index) => {
    return (
      <ul className="p-2 mt-2 break-all bg-amber-200">
        <li key={index}>
          {ch.id} : {ch.message}
        </li>
      </ul>
    );
  });
  const exitHandler = () => {
    socket.send(JSON.stringify({ type: "exit" }));
  };
  return (
    <div className="flex max-w-xl m-auto">
      <div className="flex flex-col min-w-fit text-ellipsis min-h-[40%]">
        <span>대화 참여 유저</span>
        {usersView}
      </div>
      <div className="flex flex-col w-full m-auto ml-6">
        <div className="text-left w-full min-h-[32rem] max-h-[32rem] overflow-y-scroll">
          {messageView}
        </div>
        <input
          ref={inputRef}
          className="my-6 p-6 ring-1 w-full"
          value={message}
          onChange={change}
          onKeyDown={pressEnter}
          placeholder={"메시지..."}
        />
        <div
          className="cursor-pointer hover:bg-black hover:text-white text-2xl p-4"
          onClick={exitHandler}
        >
          나가기
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
