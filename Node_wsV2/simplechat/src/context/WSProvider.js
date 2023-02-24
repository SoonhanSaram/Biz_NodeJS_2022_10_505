import { createContext, useContext, useState } from "react";

const WSContext = createContext();

export const useWSContext = () => {
  return useContext(WSContext);
};

export const WSContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState();
  const [roomId, setRoomId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const props = {
    userId,
    setUserId,
    socket,
    setSocket,
    roomId,
    setRoomId,
    selectedUser,
    setSelectedUser,
    isModalOpen,
    setIsModalOpen,
  };
  return <WSContext.Provider value={props}>{children}</WSContext.Provider>;
};
