// app/javascript/application.js
console.log("React is loading...");
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

document.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.getElementById("root"));
  root.render(<App />);
});