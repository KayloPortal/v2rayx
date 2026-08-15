import "./Section.css";

function Section({
  activeTab = "servers",
  onTabChange,
  onAddClick,
  serverCount = 0,
  subscriptionCount = 0,
}) {
  return (
    <div className="header">
      <div className="header-texts" role="tablist" aria-label="Configuration tabs">
        <button
          type="button"
          role="tab"
          id="tab-servers"
          aria-controls="panel-servers"
          aria-selected={activeTab === "servers"}
          className={`tab-btn ${activeTab === "servers" ? "tab-btn--active" : ""}`}
          onClick={() => onTabChange && onTabChange("servers")}
        >
          <span>Servers {serverCount > 0 ? `(${serverCount})` : ""}</span>
          {activeTab === "servers" && <span className="line" />}
        </button>

        <button
          type="button"
          role="tab"
          id="tab-subscriptions"
          aria-controls="panel-subscriptions"
          aria-selected={activeTab === "subscriptions"}
          className={`tab-btn ${activeTab === "subscriptions" ? "tab-btn--active" : ""}`}
          onClick={() => onTabChange && onTabChange("subscriptions")}
        >
          <span>Subscriptions {subscriptionCount > 0 ? `(${subscriptionCount})` : ""}</span>
          {activeTab === "subscriptions" && <span className="line" />}
        </button>
      </div>

      <button
        type="button"
        className="header-btn"
        onClick={onAddClick}
        aria-label={`Add new ${activeTab === "servers" ? "server configuration" : "subscription"}`}
        title={`Add ${activeTab === "servers" ? "Server" : "Subscription"}`}
      >
        <span>Add</span>
        <img src="/icons/plus.svg" alt="" aria-hidden="true" />
      </button>
    </div>
  );
}

export default Section;

