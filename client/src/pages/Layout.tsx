import { Link, Outlet } from "react-router-dom";
export default function Main() {
  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="">
        <h1 className="p-2 border-b border-white border-solid w-full text-center font-bold">
          HEADER
        </h1>
      </div>
      {/* BODY */}
      <div className="flex flex-row flex-1">
        {/* SIDE */}
        <div className="border-r border-white border-solid h-full min-w-40">
          <h1 className="border-b border-white border-solid font-bold p-2 w-full text-center">
            Links
          </h1>
          <ul className="mt-2">
            <li className="p-2">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="p-2">
              <Link to={"/signup"}>Sign Up</Link>
            </li>
            <li className="p-2">
              <Link to={"/contactus"}>Contact Us</Link>
            </li>
          </ul>
        </div>
        {/* MAIN */}
        <Outlet />
      </div>
    </div>
  );
}
