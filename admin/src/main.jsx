import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const appTree = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (!PUBLISHABLE_KEY) {
  console.warn("Missing VITE_CLERK_PUBLISHABLE_KEY, rendering app without ClerkProvider.");
  createRoot(document.getElementById("root")).render(appTree);
} else {
  createRoot(document.getElementById("root")).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {appTree}
    </ClerkProvider>,
  );
}