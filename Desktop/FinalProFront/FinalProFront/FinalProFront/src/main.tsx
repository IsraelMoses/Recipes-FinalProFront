import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./Services/UserContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <GoogleOAuthProvider clientId="563844253312-ua3ae9694ja8klfkatkd0oec5dokh05v.apps.googleusercontent.com">
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
