import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import { Fragment, useState } from "react";

const ForgotPassword = (props) => {
  const [isValidOTP, setIsValidOTP] = useState(false);
  const status = {
    isValidOTP,
    setIsValidOTP,
  };
  return (
    <Fragment>
      {!isValidOTP ? <VerifyEmail status={status} /> : ""}
      {isValidOTP ? <UpdatePassword status={status} /> : ""}
    </Fragment>
  );
};

export default ForgotPassword;
