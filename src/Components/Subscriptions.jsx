import "./Subscriptions.css";

function Subscriptions({
  subscriptions = [],
  onUpdateSubscription,
  onRemoveSubscription,
  onEditSubscription,
  onCopySubscription,
  onAddClick,
}) {
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="empty-state" role="region" aria-label="No subscriptions">
        <h3 className="empty-state-title">No Subscriptions Added</h3>
        <p className="empty-state-desc">
          Add a subscription link to automatically fetch and update server configurations.
        </p>
        <button
          type="button"
          className="empty-state-btn"
          onClick={onAddClick}
          aria-label="Add a new subscription"
        >
          <img src="/icons/plus.svg" alt="" aria-hidden="true" style={{ width: 14, height: 14 }} />
          <span>Add Subscription</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="subscriptions"
      role="region"
      aria-label="Subscriptions list"
      id="panel-subscriptions"
      tabIndex={0}
    >
      {subscriptions.map((sub) => (
        <div key={sub.id} className="sub-card">
          <div className="sub-header-row">
            <h3 className="sub-name" title={sub.name}>
              {sub.name || "Unnamed Subscription"}
            </h3>
            <div className="sub-btns">
              <button
                type="button"
                className="sub-btn"
                onClick={() => onUpdateSubscription && onUpdateSubscription(sub.id)}
                aria-label={`Update servers from ${sub.name}`}
                title="Update / Refresh servers"
              >
                <img src="/icons/wifi-green.svg" alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="sub-btn"
                onClick={() => onCopySubscription && onCopySubscription(sub)}
                aria-label={`Copy link for ${sub.name}`}
                title="Copy subscription URL"
              >
                <img src="/icons/share-2.svg" alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="sub-btn"
                onClick={() => onEditSubscription && onEditSubscription(sub)}
                aria-label={`Edit ${sub.name}`}
                title="Edit subscription"
              >
                <img src="/icons/edit.svg" alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="sub-btn sub-btn--danger"
                onClick={() => onRemoveSubscription && onRemoveSubscription(sub.id)}
                aria-label={`Delete ${sub.name}`}
                title="Delete subscription"
              >
                <img src="/icons/trash-2.svg" alt="" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="sub-footer-row">
            <p className="sub-url" title={sub.url}>
              {sub.url || "No URL specified"}
            </p>
            <div className="sub-meta">
              <span className="sub-count-badge">
                {sub.count || 0} nodes
              </span>
              <span className="sub-updated">
                {sub.lastUpdated || "Never"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Subscriptions;
