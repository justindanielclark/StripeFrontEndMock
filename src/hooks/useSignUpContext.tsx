import { createContext, useCallback, useContext, useState } from "react";

const screens = [
  "ChoosePlan",
  "EmailSignup",
  "EmailVerify",
  "ReceivePaymentInfo",
  "SuccessPaymentInfo",
  "ErrorPaymentInfo",
] as const;

type TScreenName = (typeof screens)[number];

type TSignupContext = {
  getClientEmail: () => string | null;
  setClientEmail: (email: string | null) => void;
  getInviteId: () => string | null;
  setInviteId: (inviteId: string | null) => void;
  getPriceId: () => string | null;
  setPriceId: (productId: string | null) => void;
  getProductId: () => string | null;
  setProductId: (productId: string | null) => void;
  getScreenName: () => TScreenName;
  setScreenName: (screenName: TScreenName) => void;
  getStripeClientSecret: () => string | null;
  setStripeClientSecret: (secret: string | null) => void;
};

export const SignUpContext = createContext<TSignupContext>({
  getInviteId: () => {
    throw new Error("Uninitialized Context");
  },
  setInviteId: () => {
    throw new Error("Uninitialized Context");
  },
  getClientEmail: () => {
    throw new Error("Uninitialized Context");
  },
  setClientEmail: () => {
    throw new Error("Uninitialized Context");
  },
  getPriceId: () => {
    throw new Error("Uninitialized Context");
  },
  setPriceId: () => {
    throw new Error("Uninitialized Context");
  },
  getProductId: () => {
    throw new Error("Uninitialized Context");
  },
  setProductId: () => {
    throw new Error("Uninitialized Context");
  },
  getScreenName: () => {
    throw new Error("Uninitialized Context");
  },
  setScreenName: () => {
    throw new Error("Uninitialized Context");
  },
  getStripeClientSecret: () => {
    throw new Error("Uninitialized Context");
  },
  setStripeClientSecret: () => {
    throw new Error("Uninitialized Context");
  },
});

type TProps = {
  children: React.ReactElement | React.ReactElement[] | string;
};
export function SignupContextProvider({ children }: TProps) {
  const [inviteId, setInviteId] = useState<string | null>(null);
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(
    null
  );
  const [clientEmail, setClientEmail] = useState<string | null>(null);
  const [priceId, setPriceId] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [screenName, setScreenName] = useState<TScreenName>("ChoosePlan");

  const getInviteIdFunc = useCallback(() => inviteId, [inviteId]);
  const setInviteIdFunc = useCallback((inviteId: string | null) => {
    setInviteId(inviteId);
  }, []);
  const getClientEmailFunc = useCallback(() => clientEmail, [clientEmail]);
  const setClientEmailFunc = useCallback((clientEmail: string | null) => {
    setClientEmail(clientEmail);
  }, []);
  const getPriceIdFunc = useCallback(() => priceId, [priceId]);
  const setPriceIdFunc = useCallback((priceId: string | null) => {
    setPriceId(priceId);
  }, []);
  const getProductIdFunc = useCallback(() => productId, [productId]);
  const setProductIdFunc = useCallback((productId: string | null) => {
    setProductId(productId);
  }, []);
  const getScreenNameFunc = useCallback(() => screenName, [screenName]);
  const setScreenNameFunc = useCallback((screenName: TScreenName) => {
    setScreenName(screenName);
  }, []);
  const getStripeClientSecretFunc = useCallback(
    () => stripeClientSecret,
    [stripeClientSecret]
  );
  const setStripeClientSecretFunc = useCallback(
    (stripeClientSecret: string | null) => {
      setStripeClientSecret(stripeClientSecret);
    },
    []
  );

  return (
    <SignUpContext.Provider
      value={{
        getInviteId: getInviteIdFunc,
        setInviteId: setInviteIdFunc,
        getClientEmail: getClientEmailFunc,
        setClientEmail: setClientEmailFunc,
        getPriceId: getPriceIdFunc,
        setPriceId: setPriceIdFunc,
        getProductId: getProductIdFunc,
        setProductId: setProductIdFunc,
        getScreenName: getScreenNameFunc,
        setScreenName: setScreenNameFunc,
        getStripeClientSecret: getStripeClientSecretFunc,
        setStripeClientSecret: setStripeClientSecretFunc,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

export default function useSignUpContext() {
  return useContext(SignUpContext);
}
