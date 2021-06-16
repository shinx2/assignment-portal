import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import AssignmentProvider from "./context/AssignmentProvider";
import QuestionProvider from "./context/QuestionProvider";

ReactDOM.render(
  <Router>
    <UserProvider>
      <AssignmentProvider>
        <QuestionProvider>
      <App />
      </QuestionProvider>
      </AssignmentProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
