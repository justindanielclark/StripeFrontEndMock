import React, { createContext, useContext, useState, useCallback } from "react";

type TSignUpDetails = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  userTimeDisplayPreference: string;
  organizationPhoneNumber: string;
  organizationName: string;
  organizationAddressCity: string;
  organizationAddressState: string;
  organizationAddressStreet1: string;
  organizationAddressStreet2: string;
  organizationAddressZip: string;
  organizationCurrencyPreference: string;
};

// Define the context type
type SignUpContextType = {
  signUpDetails: TSignUpDetails;
  setSignUpField: <K extends keyof TSignUpDetails>(
    field: K,
    value: TSignUpDetails[K]
  ) => void;
};

// Create the context
const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

// Provider component
export const SignUpProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [signUpDetails, setSignUpDetails] = useState<TSignUpDetails>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    userTimeDisplayPreference: "",
    organizationPhoneNumber: "",
    organizationName: "",
    organizationAddressCity: "",
    organizationAddressState: "",
    organizationAddressStreet1: "",
    organizationAddressStreet2: "",
    organizationAddressZip: "",
    organizationCurrencyPreference: "",
  });

  const setSignUpField = useCallback(
    <K extends keyof TSignUpDetails>(field: K, value: TSignUpDetails[K]) => {
      setSignUpDetails((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    },
    []
  );

  return (
    <SignUpContext.Provider value={{ signUpDetails, setSignUpField }}>
      {children}
    </SignUpContext.Provider>
  );
};

// Custom hook for consuming the context
export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUp must be used within a SignUpProvider");
  }
  return context;
};
