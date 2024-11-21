import { createContext, useContext, useState } from "react";

type TSignupContext = {
  getProductId: () => string | null;
  setProductId: (productId: string | null) => void;
};

export const SignUpContext = createContext<TSignupContext>({
  getProductId: () => {
    throw new Error("Uninitialized Context");
  },
  setProductId: () => {
    throw new Error("Uninitialized Context");
  },
});

type TProps = {
  children: React.ReactElement | React.ReactElement[] | string;
};
export function SignupContextProvider({ children }: TProps) {
  const [productId, setProductId] = useState<string | null>(null);
  const getProductIdFunc = () => {
    return productId;
  };
  const setProductIdFunc = (productId: string | null) => {
    setProductId(productId);
  };

  return (
    <SignUpContext.Provider
      value={{
        getProductId: getProductIdFunc,
        setProductId: setProductIdFunc,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

export default function useSignUpContext() {
  return useContext(SignUpContext);
}
