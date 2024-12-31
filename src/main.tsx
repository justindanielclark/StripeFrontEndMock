import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/Home/HomePage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import { SignupContextProvider } from "./hooks/useSignUpContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: (
          <SignupContextProvider>
            <SignUpPage />
          </SignupContextProvider>
        ),
      },
      {
        path: "/success",
        element: (
          <div className="w-full h-full flex flex-row items-center justify-center">
            Success!
          </div>
        ),
      },
      {
        path: "contactus",
        element: (
          <div className="w-full h-full flex flex-row items-center justify-center">
            Contact Us!
          </div>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
