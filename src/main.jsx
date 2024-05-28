import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserProvider from "./Context/UserContext";
import CustomerProvider from "./Context/CustomerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </UserProvider>
  </React.StrictMode>
);
