import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const Root = () => {
  useEffect(() => {
    // Remove Lovable badge automatically
    const badge = document.querySelector('a[href*="lovable.dev"]');
    if (badge) {
      badge.remove();
    }
  }, []);

  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
