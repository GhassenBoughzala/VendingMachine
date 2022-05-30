import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Home from "./views/home";

function App() {

  useEffect(() => {
    console.log("app");
  }, []);



  return (

      <BrowserRouter>
        <ToastContainer position="bottom-right" />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
