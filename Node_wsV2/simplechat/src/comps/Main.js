import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWSContext } from "../context/WSProvider";
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
      const ws = new WebSocket("ws://192.168.4.118:3000/");
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
    <div className="container mx-auto mt-12 flex flex-col">
      <span className="m-auto">아이디 생성</span>
      <div>
        <label className="mr-auto" onClick={onClick}>
          아이디 입력 :
        </label>
        <input
          className="ml-2 ring-1"
          value={inputValue}
          onChange={onChange}
          onKeyDown={Join}
          ref={inputRef}
          placeholder="입력 후 엔터..."
        />
      </div>
    </div>
  );
};

export default Main;
