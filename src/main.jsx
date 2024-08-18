import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserProvider from "./Context/UserContext";
import CustomerProvider from "./Context/CustomerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CustomerProvider>
          <App />
          <Analytics />
        </CustomerProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
