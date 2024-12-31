import { FormEvent, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import STRIPE_PUBLIC_KEY from "../../../constants/stripe/publicKey";
import {
  useElements,
  useStripe,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import useSignUpContext from "../../../hooks/useSignUpContext";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default function PaymentInformation() {
  const { getStripeClientSecret } = useSignUpContext();
  const stripeSecret = getStripeClientSecret();

  return (
    <div>
      <h1 className="text-lg font-bold border-b-4 mb-4">
        Enter Subscription Payment Information
      </h1>
      <div>
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: stripeSecret as string,
            appearance: {
              theme: "night",
              labels: "floating",
              variables: {
                colorBackground: "#000000",
                colorText: "#FFFFFF",
              },
            },
          }}
        >
          <PaymentForm clientSecret={stripeSecret as string} />
        </Elements>
      </div>
    </div>
  );
}

type TProps = {
  clientSecret: string;
};
function PaymentForm({ clientSecret }: TProps) {
  const { setScreenName } = useSignUpContext();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    setError(null);
    await elements.submit();
    const { error } = await stripe.confirmSetup({
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/success",
      },
    });

    if (error) {
      console.log(error);
      setError(error.message || "There was an Error");
    }
    setIsProcessing(false);
    console.log("Done");
  }
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
      <div className="flex flex-row justify-between p-2 mt-4">
        <button
          className="px-3 py-2 min-w-24 rounded-md border border-white bg-red-950"
          type="button"
          onClick={() => {
            setScreenName("EmailSignup");
          }}
        >
          Go Back
        </button>
        <button
          className="px-3 py-2 min-w-24 rounded-md border border-white bg-green-950"
          type="submit"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
