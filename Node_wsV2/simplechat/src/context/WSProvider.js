import { createContext, useContext, useState } from "react";

const WSContext = createContext();

export const useWSContext = () => {
  return useContext(WSContext);
};

export const WSContextProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState();
  const [roomId, setRoomId] = useState("");
  const props = {
    inputValue,
    setInputValue,
    socket,
    setSocket,
    roomId,
    setRoomId,
  };
  return <WSContext.Provider value={props}>{children}</WSContext.Provider>;
};
