import { useState } from "react";
import { useWSContext } from "../context/WSProvider";
const ChatModal = () => {
  const { selectedUser, setSelectedUser, isModalOpen, setIsModalOpen } =
    useWSContext();
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("send message to", selectedUser, message);
    setMessage("");
    setIsModalOpen(!isModalOpen);
  };
  const onClose = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
      <div className="absolute bg-gray-900 opacity-60 w-full h-full -z-10"></div>
      <div className="bg-white rounded-lg w-1/2 p-4">
        <h2 className="text-lg font-semibold mb-4">
          1:1 채팅 - {selectedUser}
        </h2>
        <div className="h-24 overflow-auto"></div>
        <input
          className="w-full h-8 p-2 mb-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력해주세요"
        />
        <div className="flex justify-end">
          <button
            className="text-white bg-blue-500 px-4 py-2 rounded mr-2"
            onClick={sendMessage}
          >
            보내기
          </button>
          <button className="text-gray-500 px-4 py-2 rounded" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatModal;
