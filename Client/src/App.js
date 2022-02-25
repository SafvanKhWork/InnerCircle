import { useState, Fragment } from "react";
import Header from "./components/Header";
import CurrentPage from "./components/pages/Authentication";

function App() {
  return (
    <Fragment>
      <Header />
      <CurrentPage />
    </Fragment>
  );
}

export default App;
