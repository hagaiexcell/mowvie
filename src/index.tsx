import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";
import App from "pages/App";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "pages/ErrorPage";
import Profile from "pages/Profile";
import Home from "pages/Home";
import Login from "pages/Login";
import CallbackPage from "pages/CallbackPage";
import { Provider } from "react-redux";
import store from "./store";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    return <Navigate to="/login" />;
  }

  return children;
};

const ProtectedLoginRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const sessionId = localStorage.getItem("session_id");

  if (sessionId) {
    return <Navigate to="/" />; // Redirect to home if already logged in
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedLoginRoute>
            <Login />
          </ProtectedLoginRoute>
        ),
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
