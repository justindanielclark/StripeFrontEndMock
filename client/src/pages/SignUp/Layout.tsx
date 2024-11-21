import { Outlet } from "react-router-dom";
import { SignupContextProvider } from "../../hooks/useSignUpContext";

export default function SignUpRoot() {
  return (
    <SignupContextProvider>
      <div className="h-full w-full flex flex-row justify-center items-center">
        <Outlet />
      </div>
    </SignupContextProvider>
  );
}
