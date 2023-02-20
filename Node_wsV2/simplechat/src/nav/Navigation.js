import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChatRoom from "../comps/ChatRoom";
import Main from "../comps/Main";
import WaitingRoom from "../comps/WaitingRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Main /> },
      { path: "/rooms", element: <WaitingRoom /> },
      { path: `/chat/:roomid`, element: <ChatRoom /> },
    ],
  },
]);

export default router;
