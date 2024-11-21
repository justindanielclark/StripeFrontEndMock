import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import SignUpLayout from "./pages/SignUp/Layout";
import HomePage from "./pages/Home/HomePage";
import ChooseProduct from "./pages/SignUp/ChooseProduct";
import RegisterEmailAndPassword from "./pages/SignUp/RegisterEmailAndPassword";
import PaymentInformation from "./pages/SignUp/PaymentInformation";

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
            element: <RegisterEmailAndPassword />,
          },
          {
            path: "/signup/payment-information",
            element: <PaymentInformation />,
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
