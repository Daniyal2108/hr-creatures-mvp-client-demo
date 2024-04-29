import React, { useState, useEffect } from "react";
import Button from "./Button";

const InstallPWAButton = (props) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Check if the PWA install prompt is available
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleBeforeInstallPrompt = (event) => {
    // Prevent the default prompt
    event.preventDefault();
    // Store the event for later use
    setDeferredPrompt(event);
  };

  const handleInstallButtonClick = () => {
    // Check if the deferredPrompt is available
    if (deferredPrompt) {
      // Show the PWA installation prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        // Reset the deferredPrompt after the prompt is shown
        setDeferredPrompt(null);
      });
    }
  };

  // Only show the button when the deferredPrompt is available
  if (!deferredPrompt) {
    return null;
  }

  return (
    <Button
      className={props.className}
      onClick={handleInstallButtonClick}
      text="Install App"
    />
  );
};

export default InstallPWAButton;
