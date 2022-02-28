import SignIn from "../components/Auth/pages/SignIn";
import SignUp from "../components/Auth/pages/SignUp";
import ForgotPassword from "../components/Auth/ForgotPassword";

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
      {isUser && hasPasswd ? <SignIn status={status} /> : ""}
      {!isUser ? <SignUp status={status} /> : ""}
      {isUser && !hasPasswd ? <ForgotPassword status={status} /> : ""}
    </Fragment>
  );
};
export default Authentication;
