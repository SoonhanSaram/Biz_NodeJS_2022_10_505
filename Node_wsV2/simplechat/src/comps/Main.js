import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWSContext } from "../context/WSProvider";
const IP = { home: "192.168.0.5", academy: "192.168.4.118" };
const Main = () => {
  const navigate = useNavigate();
  const { userId, setUserId, socket, setSocket } = useWSContext();
  const inputRef = useRef();
  const onChange = (e) => {
    setUserId(e.target.value);
  };
  const onClick = (e) => {
    inputRef.current.focus();
  };
  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        socket.send(JSON.stringify({ type: "id", id: userId }));
        navigate("/rooms");
      };
    }
  }, [socket]);
  const Join = (e) => {
    if (e.key === "Enter") {
      const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
      if (regex.test(userId) && userId.length >= 5) {
        const ws = new WebSocket(`ws://${IP.academy}:3000/`);
        setSocket(ws);
      } else alert("특수문자를 제외한 아이디로 5글자 이상으로 만들어주세요");
    }
  };

  return (
    <div className="container mx-auto mt-12 flex flex-col h-96 max-w-[15%] border-2 border-black bg-slate-700">
      <span className="mx-auto mb-12 text-white text-5xl ">SimpleChat</span>
      <div className="m-auto">
        <span className="text-2xl text-white">아이디 생성</span>
        <div>
          <label className="mr-auto text-white" onClick={onClick}>
            ID :{" "}
          </label>
          <input
            className="mt-12 ring-1 "
            value={userId}
            onChange={onChange}
            onKeyDown={Join}
            ref={inputRef}
            placeholder="입력 후 엔터..."
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
