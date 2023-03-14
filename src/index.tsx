import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/login/SignUpPage";
import ForgotPasswordPage from "./pages/login/ForgotPasswordPage";
import DashboardPage from "./pages/dashboard/Dashboard";
import { FirebaseAuthWrapper } from "./firebase/auth/AuthContextWrapper";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./pages/home/HomePage";
import NavFrame from "../src/frames/NavFrame";
import ImpressionTitle from "./pages/impression/ImpressionTitle";
import ImpressionList from "./pages/impression/ImpressionList";
import ImpressionListItem from "./pages/impression/ImpressionListItem";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <NavFrame />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "impression/",
        element: (
          <>
            <div className="flex flex-col">
              <ImpressionTitle onButtonClick={() => console.log("fart")} />
              <div className="h-1/2">
                <ImpressionList>
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                  <ImpressionListItem />
                </ImpressionList>
              </div>
            </div>
          </>
        ),
        children: [
          {
            path: ":id",
            element: <>id</>,
          },
          {
            path: "about",
            element: <>id</>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/forgot", element: <ForgotPasswordPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FirebaseAuthWrapper>
      <RouterProvider router={router} />
    </FirebaseAuthWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
