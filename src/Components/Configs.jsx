import "./Configs.css";

function Configs({
  configs = [],
  selectedConfigId,
  onSelectConfig,
  onRemoveConfig,
  onEditConfig,
  onCopyConfig,
  onAddClick,
}) {
  if (!configs || configs.length === 0) {
    return (
      <div className="empty-state" role="region" aria-label="No configurations">
        <h3 className="empty-state-title">No Configurations Available</h3>
        <p className="empty-state-desc">
          Add your first proxy server or import a configuration URL to get started.
        </p>
        <button
          type="button"
          className="empty-state-btn"
          onClick={onAddClick}
          aria-label="Add a new server"
        >
          <img src="/icons/plus.svg" alt="" aria-hidden="true" style={{ width: 14, height: 14 }} />
          <span>Add Server</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="configs"
      role="region"
      aria-label="Server configurations list"
      id="panel-servers"
      tabIndex={0}
    >
      {configs.map((config) => (
        <ConfigCard
          key={config.id}
          data={config}
          isSelected={selectedConfigId === config.id}
          onSelect={onSelectConfig}
          onRemove={onRemoveConfig}
          onEdit={onEditConfig}
          onCopy={onCopyConfig}
        />
      ))}
    </div>
  );
}

function ConfigCard({
  data,
  isSelected,
  onSelect,
  onRemove,
  onEdit,
  onCopy,
}) {
  const { id, title, address, protocol, ping } = data;

  // Safe ping parsing and formatting
  const pingNum = Number.isFinite(Number(ping)) && Number(ping) >= 0 ? Math.round(Number(ping)) : null;
  const isHealthy = pingNum !== null && pingNum < 150;
  const pingIcon = `/icons/wifi-${isHealthy ? "green" : "red"}.svg`;
  const pingDisplay = pingNum !== null ? `${pingNum} ms` : (ping === "timeout" ? "Timeout" : (ping || "-"));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect && onSelect(id);
    }
  };

  return (
    <div
      className={`config ${isSelected ? "config--selected" : ""}`}
      onClick={() => onSelect && onSelect(id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Server ${title}, protocol ${protocol || "VLESS"}, ping ${pingDisplay}`}
    >
      <div className="config-header-row">
        <h3 className="config-name" title={title}>
          {title || "Unnamed Server"}
        </h3>
        <div className="config-btns">
          <button
            type="button"
            className="config-btn"
            onClick={(e) => {
              e.stopPropagation();
              onCopy && onCopy(data);
            }}
            aria-label={`Copy configuration for ${title}`}
            title="Copy configuration link"
          >
            <img src="/icons/share-2.svg" alt="" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="config-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit(data);
            }}
            aria-label={`Edit configuration for ${title}`}
            title="Edit configuration"
          >
            <img src="/icons/edit.svg" alt="" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="config-btn config-btn--danger"
            onClick={(e) => {
              e.stopPropagation();
              onRemove && onRemove(id);
            }}
            aria-label={`Delete configuration for ${title}`}
            title="Delete configuration"
          >
            <img src="/icons/trash-2.svg" alt="" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="config-footer-row">
        <p className="config-address" title={address}>
          {address || "No address specified"}
        </p>
        <div className="config-details">
          <span className="config-protocol">
            {protocol ? protocol.toUpperCase() : "VLESS"}
          </span>
          <div className="config-ping-wrapper" title={`Latency: ${pingDisplay}`}>
            <img
              src={pingIcon}
              alt=""
              aria-hidden="true"
              className="config-ping-icon"
            />
            <span className="config-ping">{pingDisplay}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configs;

