import { FormEvent, Suspense, useState } from "react";
import { StripeCardElement, StripeError, loadStripe } from "@stripe/stripe-js";
import STRIPE_PUBLIC_KEY from "../../constants/stripe/publicKey";
import {
  PaymentElement,
  CardElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default function PaymentInformation() {
  return (
    <div>
      <h1>Pay</h1>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "setup",
          clientSecret:
            "seti_1QNUCFLJih1LMxtD8dtkpfYO_secret_RG0CYTNJ1SEJnesqbFsbO1FjmZetVsW",
        }}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet.
    }

    setIsLoading(true);

    const cardElement = elements.getElement(PaymentElement);

    const { setupIntent, error } = await stripe.confirmCardSetup(
      "seti_1QNUCFLJih1LMxtD8dtkpfYO_secret_RG0CYTNJ1SEJnesqbFsbO1FjmZetVsW",
      {
        payment_method: {
          card: cardElement as StripeCardElement,
        },
      }
    );

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Success! Payment method has been saved.");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Set Up Payment Method</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <PaymentElement />
        </div>
        <button type="submit" disabled={!stripe || isLoading}>
          {isLoading ? "Processing..." : "Save Payment Method"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
