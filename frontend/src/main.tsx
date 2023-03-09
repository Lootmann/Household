import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./components/Main/Layout";
import Root from "./components/Root";
import History from "./components/History/Layout";
import { getYear, getMonth } from "./components/util";
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
        path: "/histories",
        element: <History year={getYear()} month={getMonth()} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
