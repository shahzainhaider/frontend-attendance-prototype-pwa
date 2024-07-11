import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch((error) => {
      console.log('ServiceWorker registration failed: ', error);
    });

    navigator.serviceWorker.ready.then((registration) => {
      if ('sync' in registration) {
        registration.sync.register('sync-api-queue').then(() => {
          console.log('Sync event registered');
        }).catch((err) => {
          console.error('Sync registration failed:', err);
        });
      }
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
