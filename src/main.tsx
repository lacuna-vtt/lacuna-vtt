import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NakamaProvider } from "./NakamaContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
  <NakamaProvider>
    <App />
  </NakamaProvider>
  //</React.StrictMode>
);
