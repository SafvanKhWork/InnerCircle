import SignIn from "../forms/SignIn";
import SignUp from "../forms/SignUp";
import ForgotPassword from "./ForgotPassword";

import { useState, Fragment } from "react";

const Authentication = (props) => {
  const [isUser, setIsUser] = useState(false);
  const [hasPasswd, setHasPasswd] = useState(true);

  const status = {
    isUser,
    setIsUser,
    hasPasswd,
    setHasPasswd,
  };
  return (
    <Fragment>
      {isUser && hasPasswd ? <SignIn /> : ""}
      {!isUser ? <SignUp /> : ""}
      {isUser && hasPasswd ? <SignIn /> : ""}
    </Fragment>
  );
};
export default Authentication;
