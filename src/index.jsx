// Bring React in to build a component.
import React from "react";
// Import from react-dom the ability to create a root render
import { createRoot } from "react-dom/client";
import App from './App';
import './index.css';
const root = createRoot(document.getElementById("root"));

root.render(<React.StrictMode>
              <App />
            </React.StrictMode>
            );