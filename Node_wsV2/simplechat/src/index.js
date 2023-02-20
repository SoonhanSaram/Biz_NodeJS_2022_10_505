import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { WSContextProvider } from "./context/WSProvider";
import "./css/index.css";
import router from "./nav/Navigation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WSContextProvider>
    <RouterProvider router={router} />
  </WSContextProvider>
);
