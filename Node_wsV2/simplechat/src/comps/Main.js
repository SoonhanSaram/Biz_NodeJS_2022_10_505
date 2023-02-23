import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWSContext } from "../context/WSProvider";
const IP = { home: "192.168.0.5", academy: "19.168.4.118" };
const Main = () => {
  const navigate = useNavigate();
  const { inputValue, setInputValue, socket, setSocket } = useWSContext();
  const inputRef = useRef();
  const onChange = (e) => {
    setInputValue(e.target.value);
  };
  const onClick = (e) => {
    inputRef.current.focus();
  };
  const Join = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      const ws = new WebSocket(`ws://${IP.home}:3000/`);
      setSocket(ws);
    }
  };
  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        socket.send(JSON.stringify({ type: "id", id: inputValue }));
        navigate("/rooms");
      };
    }
  }, [socket]);
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
            value={inputValue}
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
