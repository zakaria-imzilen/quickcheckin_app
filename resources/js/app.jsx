import "./bootstrap";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
