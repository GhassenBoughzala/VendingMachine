import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import Home from "./views/home";
import store from "./redux/store";

function App() {

  useEffect(() => {
    console.log("app");
  }, []);



  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer position="bottom-right" />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
