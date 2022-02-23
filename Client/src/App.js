import SignIn from "./components/forms/SignIn";
import SignUp from "./components/forms/SignUp";

import { useState, Fragment } from "react";

function App() {
  const [isUser, setIsUser] = useState(true);
  return (
    <Fragment>
      {isUser ? (
        <SignIn status={{ isUser, setIsUser }} />
      ) : (
        <SignUp status={{ isUser, setIsUser }} />
      )}
    </Fragment>
  );
}

export default App;
