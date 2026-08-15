import "./Start.css";

function Start({ status = "disconnected", selectedConfig, onToggleConnect }) {
  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  const getStatusText = () => {
    if (isConnecting) return "Connecting...";
    if (isConnected) return `Connected • ${selectedConfig ? selectedConfig.title : "Proxy Active"}`;
    return selectedConfig ? `Ready • ${selectedConfig.title}` : "Disconnected";
  };

  const getAriaLabel = () => {
    if (isConnecting) return "Connecting to proxy, click to cancel";
    if (isConnected) return `Connected to ${selectedConfig ? selectedConfig.title : "proxy"}. Click to disconnect`;
    return `Disconnected. Click to connect to ${selectedConfig ? selectedConfig.title : "selected server"}`;
  };

  return (
    <div className="start-wrapper">
      <button
        type="button"
        className={`start ${isConnected ? "start--connected" : ""} ${isConnecting ? "start--connecting" : ""}`}
        onClick={onToggleConnect}
        aria-label={getAriaLabel()}
        aria-pressed={isConnected}
        title={isConnected ? "Click to disconnect" : "Click to connect"}
      >
        <div className="start-container">
          <img
            src="/icons/start.svg"
            alt=""
            aria-hidden="true"
            className="start-icon"
          />
        </div>
      </button>

      <div className="status-indicator" role="status" aria-live="polite">
        <span
          className={`status-dot ${isConnected ? "status-dot--connected" : ""} ${isConnecting ? "status-dot--connecting" : ""}`}
          aria-hidden="true"
        />
        <span
          className={`status-text ${isConnected ? "status-text--connected" : ""} ${isConnecting ? "status-text--connecting" : ""}`}
        >
          {getStatusText()}
        </span>
      </div>
    </div>
  );
}

export default Start;

