import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import ENDPOINTS from "../../../constants/api/endpoints";
import useSignUpContext from "../../../hooks/useSignUpContext";

type TServerResponse = {
  clientSecret: string;
};

type TVerifyEmailInputs = {
  inviteCode: string;
  inviteId: string;
};
type TVerifyEmailOutputs =
  | {
      success: true;
      clientSecret: string;
    }
  | {
      success: false;
      message: string;
    };

async function verifyEmail(
  input: TVerifyEmailInputs
): Promise<TVerifyEmailOutputs> {
  const { inviteCode, inviteId } = input;

  const resp = await fetch(ENDPOINTS.verifyEmail, {
    method: "POST",
    body: JSON.stringify({ inviteCode, inviteId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (resp.ok) {
    const parsed = (await resp.json()) as TServerResponse;
    return {
      success: true,
      clientSecret: parsed.clientSecret,
    };
  }
  return {
    success: false,
    message: "Failed to Verify",
  };
}

export default function EmailVerify() {
  const {
    getClientEmail,
    getInviteId,
    setScreenName,
    setStripeClientSecret,
    setClientEmail,
    setInviteId,
  } = useSignUpContext();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const inviteId = getInviteId();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteCode(
      e.target.value
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 6)
    );
  };
  const onGoBack = () => {
    setClientEmail(null);
    setInviteId(null);
    setScreenName("EmailSignup");
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!submitting && inviteId) {
      setSubmitting(true);
      const resp = await verifyEmail({ inviteCode, inviteId });
      if (resp.success) {
        setStripeClientSecret(resp.clientSecret);
        setScreenName("ReceivePaymentInfo");
      } else {
        setMessage(resp.message);
      }
      setSubmitting(false);
    }
  };

  return (
    <form method="" action="" onSubmit={onSubmit}>
      <h1 className="text-lg font-bold border-b-4 mb-4">
        Verify Your Email Address
      </h1>
      {message && <p className="text-red-700 font-bold">{message}</p>}
      <div className="my-4 flex flex-col gap-1">
        <p>A code has been sent to:</p>
        <p className="text-center font-bold">{getClientEmail()}</p>
      </div>
      <div>
        <label className="flex flex-col justify-center items-center">
          <span className="font-bold">Input Code:</span>
          <input
            value={inviteCode}
            className="mx-2 my-1 rounded-lg px-2 py-1 text-black max-w-24 text-center"
            type="text"
            onChange={onChange}
          />
        </label>
      </div>
      <div className="flex flex-end justify-between mt-2">
        <button
          type="button"
          className="bg-red-800 px-4 py-1 rounded-lg border border-white border-solid relative active:top-[2px] active:left-[2px]"
          onClick={onGoBack}
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-800 px-4 py-1 rounded-lg border border-white border-solid relative active:top-[2px] active:left-[2px] disabled:bg-gray-500 disabled:text-gray-400"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
