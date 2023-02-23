import { useEffect, useRef, useState } from "react";
import { useWSContext } from "../context/WSProvider";
import { useNavigate } from "react-router-dom";
const ChatRoom = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [exitUser, setExituser] = useState();
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
        return false;
      } else if (data.type === "exitMessage") {
        console.log("object");
        setExituser((prevExitUser) => {
          // 이전 값과 비교하여 변경된 부분만 업데이트
          const newExitUser = [...prevExitUser];
          const index = newExitUser.indexOf(data.user);
          if (index >= 0) {
            newExitUser.splice(index, 1);
          }
          return newExitUser;
        });
      } else setChat((chat) => [...chat, data]);
    };
  }, [socket]);
  const exitMessageView = exitUser?.map((user, index) => {
    return (
      <div key={index}>
        <span>{user}</span>
      </div>
    );
  });

  const usersView =
    users.length > 0
      ? users.map((user, index) => {
          return (
            <span key={index}>
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
    socket.send(JSON.stringify({ type: "exit", roomId: roomId }));
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
          {exitMessageView}
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
