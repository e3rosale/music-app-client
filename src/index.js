import React from "react";
import { createRoot } from 'react-dom/client';

import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./context/StateContext";

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>
);