import { useEffect, useRef, useState } from "react";
import { useWSContext } from "../context/WSProvider";
import { useNavigate } from "react-router-dom";
import ChatModal from "./ChatModal";

const ChatRoom = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [exitUser, setExitUser] = useState([]);
  const [enterUser, setEnterUser] = useState([]);
  const change = (e) => setMessage(e.target.value);
  const {
    socket,
    roomId,
    userId,
    selectedUser,
    setSelectedUser,
    isModalOpen,
    setIsModalOpen,
  } = useWSContext();
  const inputRef = useRef();
  const pressEnter = (e) => {
    if (e.key === "Enter") {
      socket.send(
        JSON.stringify({ type: "chat", message, room: roomId, id: userId })
      );
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
      // 입장
      if (data.type === `users${roomId}`) {
        setUsers([...data.users]);
        if (data.userid !== userId)
          setChat((chat) => [...chat, { id: data.userid, message: "님 입장" }]);
        // 퇴장
      } else if (data.type === `exitMessage${roomId}`) {
        if (data.user)
          setChat((chat) => [...chat, { id: data.user, message: "님 퇴장" }]);
        if (data.users) {
          setUsers([...data.users]);
        }
      } else if (data.type === "chat") {
        setChat((chat) => [...chat, data.payload]);
      }
    };
  }, [socket]);

  const OneonOneChat = (user) => {
    setSelectedUser(user);
    setIsModalOpen(!isModalOpen);
  };

  const usersView =
    users?.length > 0
      ? users.map((user, index) => {
          return (
            <span
              key={index}
              className="text-left"
              onClick={() => OneonOneChat(user)}
            >
              {index + 1}. {user}
            </span>
          );
        })
      : null;

  const exitHandler = () => {
    socket.send(JSON.stringify({ type: "exit", room: roomId, id: userId }));
    navigate("/rooms");
  };

  const messageView = chat?.map((ch, index) => {
    return userId == ch.id ? (
      <ul className="p-2 m-2 max-w-fit ml-auto text-right break-all bg-amber-200">
        <li key={userId}>{ch.message}</li>
      </ul>
    ) : (
      <ul className="p-2 m-2 max-w-fit break-all text-white bg-slate-400">
        <li key={(ch.id, index)}>
          {ch.id} : {ch.message}
        </li>
      </ul>
    );
  });
  return (
    <div className="flex max-w-xl m-auto">
      <div className="flex flex-col min-w-fit text-ellipsis min-h-[40%]">
        <span>
          대화 참여 유저 <br></br>
          {users?.length}명
        </span>
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
      {isModalOpen ? <ChatModal /> : null}
    </div>
  );
};

export default ChatRoom;
