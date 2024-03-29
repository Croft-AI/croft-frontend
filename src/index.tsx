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
import ImpressionBuildPage from "./pages/impression/ImpressionBuildPage";
import ImpressionPage from "./pages/impression/ImpressionPage";
import ResultDisplayPage from "./pages/result/ResultDisplayPage";
import ResultCollectionPage from "./pages/result/ResultCollectionPage";
import ResultListItemPage from "./pages/result/ResultListItemPage";
import ScheduleDisplayPage from "./pages/schedule/ScheduleDisplayPage";
import { Notifications } from "@mantine/notifications";
import ProfilePage from "./pages/profile/ProfilePage";
import BillingPage from "./pages/billing/BillingPage";
import LandingHome from "./pages/public/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <NavFrame />
      </ProtectedRoute>
    ),
    children: [
      { path: "/schedules", element: <ScheduleDisplayPage /> },
      {
        path: "/impression/:id",
        element: <ImpressionBuildPage />,
      },
      {
        path: "/impression",
        element: <ImpressionPage />,
      },
      {
        path: "/result",
        element: <ResultCollectionPage />,
      },
      {
        path: "/result/:id",
        element: <ResultDisplayPage />,
      },
      {
        path: "/result/:id/view",
        element: <ResultListItemPage />,
      },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/billing", element: <BillingPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
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
  { path: "/home", element: <LandingHome /> },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FirebaseAuthWrapper>
      <Notifications />
      <RouterProvider router={router} />
    </FirebaseAuthWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
