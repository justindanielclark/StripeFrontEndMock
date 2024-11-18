import { Outlet } from "react-router-dom";

export default function SignUpRoot() {
  return (
    <div className="h-full w-full flex flex-row justify-center items-center">
      <Outlet />
    </div>
  );
}
