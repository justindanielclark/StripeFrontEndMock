import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import SignUpLayout from "./pages/SignUp/Layout";
import HomePage from "./pages/Home/HomePage";
import ChooseProduct from "./pages/SignUp/ChooseProduct";
import CreateAccount from "./pages/SignUp/CreateAccount";

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
        element: <SignUpLayout />,
        children: [
          {
            path: "/signup",
            element: <ChooseProduct />,
          },
          {
            path: "/signup/create-account",
            element: <CreateAccount />,
          },
          {
            path: "/signup/create-payment-account",
            element: <div>Create Payment Profile</div>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
