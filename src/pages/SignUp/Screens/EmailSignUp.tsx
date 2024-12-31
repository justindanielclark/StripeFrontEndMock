import { ChangeEvent, FormEvent, useState } from "react";
import useSignUpContext from "../../../hooks/useSignUpContext";
import ENDPOINTS from "../../../constants/api/endpoints";

type TServerResponse = {
  inviteId: string;
};

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function EmailSignUp() {
  const {
    setScreenName,
    setProductId,
    setPriceId,
    getProductId,
    getPriceId,
    setClientEmail,
    setInviteId,
  } = useSignUpContext();
  const [error, setError] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [formData, setFormData] = useState<TFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const priceId = getPriceId();
  const productId = getProductId();

  function handleFormDataChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!sending) {
      signUp();
    }
  }

  async function signUp() {
    setSending(true);
    const resp = await fetch(ENDPOINTS.signUp, {
      method: "POST",
      body: JSON.stringify({ ...formData, productId, priceId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.ok) {
      const parsed = (await resp.json()) as TServerResponse;
      setInviteId(parsed.inviteId);
      setScreenName("EmailVerify");
      setClientEmail(formData.email);
    } else {
      setError(true);
    }
    setSending(false);
  }

  return (
    <div>
      <h1 className="text-lg font-bold border-b-4 mb-4">
        Enter Root Account Details
      </h1>
      {error ? (
        <div>There was an error... Try again later</div>
      ) : (
        <form action="" method="" className="" onSubmit={handleSubmit}>
          <label className="flex flex-col pb-1" htmlFor="firstName">
            <span className="inline-block font-bold pb-0.5">First Name:</span>
            <input
              name="firstName"
              className="text-black py-1.5 px-2 rounded-lg"
              value={formData.firstName}
              onChange={handleFormDataChange}
            />
          </label>
          <label className="flex flex-col pb-1">
            <span className="inline-block font-bold pb-0.5">Last Name:</span>
            <input
              name="lastName"
              className="text-black py-1.5 px-2 rounded-lg"
              value={formData.lastName}
              onChange={handleFormDataChange}
            />
          </label>
          <label className="flex flex-col pb-1">
            <span className="inline-block font-bold pb-0.5">Email:</span>
            <input
              name="email"
              className="text-black py-1.5 px-2 rounded-lg"
              value={formData.email}
              onChange={handleFormDataChange}
            />
          </label>
          <label className="flex flex-col pb-1">
            <span className="inline-block font-bold pb-0.5">Password:</span>
            <input
              name="password"
              className="text-black py-1.5 px-2 rounded-lg"
              value={formData.password}
              onChange={handleFormDataChange}
            />
          </label>
          <label className="flex flex-col pb-1">
            <span className="inline-block font-bold pb-0.5">
              Confirm Password:
            </span>
            <input
              name="confirmPassword"
              className="text-black py-1.5 px-2 rounded-lg"
              value={formData.confirmPassword}
              onChange={handleFormDataChange}
            />
          </label>
          <div className="flex flex-end justify-between mt-2">
            <button
              type="button"
              className="bg-red-800 px-4 py-1 rounded-lg border border-white border-solid relative active:top-[2px] active:left-[2px]"
              onClick={() => {
                setPriceId(null);
                setProductId(null);
                setScreenName("ChoosePlan");
              }}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-green-800 px-4 py-1 rounded-lg border border-white border-solid relative active:top-[2px] active:left-[2px] disabled:bg-gray-500 disabled:text-gray-400"
              disabled={sending}
            >
              {sending ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
