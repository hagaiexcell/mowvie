import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";
import App from "pages/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "pages/ErrorPage";
import Profile from "pages/Profile";
import Home from "pages/Home";
import Login from "pages/Login";
import CallbackPage from "pages/CallbackPage";
import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "callback-page",
        element: <CallbackPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
