import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./components/Main/Layout";
import Root from "./components/Root";
import History, { loader as historyLoader } from "./components/History/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/histories/:year/:month",
        element: <History />,
        loader: historyLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
