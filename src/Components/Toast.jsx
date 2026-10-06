import { useEffect } from "react";
import "./Toast.css";

function Toast({ message, type = "info", onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="toast-container">
      <div
        className={`toast toast--${type}`}
        role="status"
        aria-live="polite"
      >
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
