import VerifyEmail from "../forms/VerifyEmail";
import UpdatePassword from "../forms/UpdatePassword";
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
