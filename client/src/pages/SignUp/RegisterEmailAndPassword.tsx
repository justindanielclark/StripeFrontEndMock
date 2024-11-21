import { useState } from "react";
import useSignUpContext from "../../hooks/useSignUpContext";
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../../constants/api/endpoints";

async function setupCustomer(email: string, password: string) {
  const resp = await fetch(ENDPOINTS.setupCustomer, {
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (resp.ok) {
    const parsed = await resp.json();
    console.log({ parsed });
  }
}

export default function RegisterEmailAndPassword() {
  const [sending, setSending] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const { getProductId, setProductId } = useSignUpContext();

  async function setup() {
    setSending(true);
    await setupCustomer(email, password);
    navigate("");
  }

  return (
    <div>
      <h1 className="text-lg font-bold border-b-4 mb-4">
        Enter Root Account Details
      </h1>
      <form action="" method="" className="">
        <label className="flex flex-col pb-1">
          <span className="inline-block font-bold pb-0.5">Email:</span>
          <input
            className="text-black py-1.5 px-2 rounded-lg"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="flex flex-col pb-1">
          <span className="inline-block font-bold pb-0.5">Password:</span>
          <input
            className="text-black py-1.5 px-2 rounded-lg"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label className="flex flex-col pb-1">
          <span className="inline-block font-bold pb-0.5">
            Confirm Password:
          </span>
          <input
            className="text-black py-1.5 px-2 rounded-lg"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </label>
        <div className="flex flex-end justify-between mt-2">
          <button
            type="button"
            className="bg-red-800 px-4 py-1 rounded-lg border border-white border-solid relative active:top-[2px] active:left-[2px]"
            onClick={() => {
              setProductId(null);
              navigate("/signup");
            }}
          >
            Back
          </button>
          <button
            type="button"
            className="bg-green-800 px-4 py-1 rounded-lg border border-white border-solid relative active:top-[2px] active:left-[2px] disabled:bg-gray-500 disabled:text-gray-400"
            disabled={sending}
          >
            {sending ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
