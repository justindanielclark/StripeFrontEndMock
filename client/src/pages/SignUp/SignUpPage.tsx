import useSignUpContext from "../../hooks/useSignUpContext";
import { useMemo } from "react";
import ChoosePlan from "./Screens/ChoosePlan";
import EmailSignUp from "./Screens/EmailSignUp";
import ReceivePaymentInformation from "./Screens/ReceivePaymentInformation";
import EmailVerify from "./Screens/EmailVerify";

export default function SignUpPage() {
  const { getScreenName } = useSignUpContext();
  const screenName = getScreenName();
  const rendered = useMemo(() => {
    switch (screenName) {
      case "ChoosePlan": {
        return <ChoosePlan />;
      }
      case "EmailSignup": {
        return <EmailSignUp />;
      }
      case "EmailVerify": {
        return <EmailVerify />;
      }
      case "ReceivePaymentInfo": {
        return <ReceivePaymentInformation />;
      }
      case "SuccessPaymentInfo": {
        return <div>Choose Plan</div>;
      }
      case "ErrorPaymentInfo": {
        return <div>Choose Plan</div>;
      }
    }
  }, [screenName]);
  return (
    <div className="h-full w-full flex flex-row justify-center items-center">
      <div className="max-w-96 w-full border-slate-500 border-solid border p-2 rounded-lg">
        {rendered}
      </div>
    </div>
  );
}
