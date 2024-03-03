import React from "react";
import { createRoot } from "react-dom/client";
import Root from "./Routes/Root";
import "../src/styles/index.scss";
import { Provider } from "jotai";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <Root />
    </Provider>
  </React.StrictMode>
);
