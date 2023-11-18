import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import { ErrorMessageProvider } from "./providers/globalState";
import TodoCreate from "./pages/TodoCreate";

function main() {
  const root = document.getElementById("root");
  if (!root) {
    alert("missing root element");
    return;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "todos",
          element: <TodoCreate/>
        },
        {
          path: "notes",
          element: <Notes/>
        }
      ]
    },
  ]);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      {/* Apply Global State Provider Here */}
      <ErrorMessageProvider>
        <RouterProvider router={router} />
      </ErrorMessageProvider>
    </React.StrictMode>,
  );
}

main();
