import { useState, useEffect, useRef } from "react";
import "./ConfigModal.css";

function ConfigModal({
  isOpen,
  mode = "add-server", // 'add-server' | 'edit-server' | 'add-sub' | 'edit-sub'
  initialData = null,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    port: "443",
    protocol: "VLESS",
    url: "",
    quickImport: "",
  });

  const [errors, setErrors] = useState({});
  const firstInputRef = useRef(null);

  const isServerMode = mode === "add-server" || mode === "edit-server";
  const isEditMode = mode === "edit-server" || mode === "edit-sub";

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || initialData.name || "",
          address: initialData.address || "",
          port: initialData.port || "443",
          protocol: initialData.protocol || "VLESS",
          url: initialData.url || "",
          quickImport: "",
        });
      } else {
        setFormData({
          title: "",
          address: "",
          port: "443",
          protocol: "VLESS",
          url: "",
          quickImport: "",
        });
      }
      setErrors({});
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialData, mode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleQuickImportChange = (e) => {
    const raw = e.target.value;
    setFormData((prev) => ({ ...prev, quickImport: raw }));

    // Try parsing standard proxy URI (vless://, vmess://, trojan://, ss://)
    try {
      if (raw.startsWith("vless://") || raw.startsWith("trojan://") || raw.startsWith("ss://")) {
        const parsed = new URL(raw);
        const protocolName = raw.split("://")[0].toUpperCase();
        const host = parsed.hostname;
        const port = parsed.port || "443";
        const title = decodeURIComponent(parsed.hash ? parsed.hash.replace("#", "") : host);

        setFormData((prev) => ({
          ...prev,
          title: title || prev.title,
          address: host || prev.address,
          port: port || prev.port,
          protocol: protocolName === "SS" ? "Shadowsocks" : protocolName,
        }));
      } else if (raw.startsWith("http://") || raw.startsWith("https://")) {
        setFormData((prev) => ({
          ...prev,
          url: raw,
        }));
      }
    } catch {
      // Ignore URL parsing errors while typing
    }
  };

  const validate = () => {
    const newErrors = {};

    if (isServerMode) {
      if (!formData.title.trim()) {
        newErrors.title = "Server title is required";
      }
      if (!formData.address.trim()) {
        newErrors.address = "Server address or host is required";
      }
      const portNum = Number(formData.port);
      if (!formData.port || isNaN(portNum) || portNum < 1 || portNum > 65535) {
        newErrors.port = "Port must be between 1 and 65535";
      }
    } else {
      if (!formData.title.trim()) {
        newErrors.title = "Subscription name is required";
      }
      if (!formData.url.trim()) {
        newErrors.url = "Subscription URL is required";
      } else if (!/^https?:\/\//i.test(formData.url.trim())) {
        newErrors.url = "URL must start with http:// or https://";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isServerMode) {
      onSubmit({
        id: initialData?.id || `srv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        title: formData.title.trim(),
        address: formData.address.trim(),
        port: formData.port.trim(),
        protocol: formData.protocol,
        ping: initialData?.ping || Math.floor(Math.random() * 80 + 30).toString(),
      });
    } else {
      onSubmit({
        id: initialData?.id || `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: formData.title.trim(),
        url: formData.url.trim(),
        count: initialData?.count || Math.floor(Math.random() * 8 + 4),
        lastUpdated: "Just now",
      });
    }

    onClose();
  };

  const getModalTitle = () => {
    if (mode === "add-server") return "Add Server Configuration";
    if (mode === "edit-server") return "Edit Server Configuration";
    if (mode === "add-sub") return "Add Subscription";
    if (mode === "edit-sub") return "Edit Subscription";
    return "Configuration";
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {getModalTitle()}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          {!isEditMode && isServerMode && (
            <div className="form-group">
              <label htmlFor="quick-import" className="form-label">
                Quick Import URL (Optional)
              </label>
              <input
                id="quick-import"
                type="text"
                className="form-input"
                placeholder="vless://... or vmess://..."
                value={formData.quickImport}
                onChange={handleQuickImportChange}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="config-title" className="form-label">
              {isServerMode ? "Server Name / Title" : "Subscription Name"} *
            </label>
            <input
              ref={firstInputRef}
              id="config-title"
              type="text"
              className={`form-input ${errors.title ? "form-input--error" : ""}`}
              placeholder={isServerMode ? "e.g. Frankfurt Fast 01" : "e.g. Daily VIP Nodes"}
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              aria-invalid={Boolean(errors.title)}
            />
            {errors.title && <span className="form-error-msg">{errors.title}</span>}
          </div>

          {isServerMode ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="config-address" className="form-label">
                    Server Address / Host *
                  </label>
                  <input
                    id="config-address"
                    type="text"
                    className={`form-input ${errors.address ? "form-input--error" : ""}`}
                    placeholder="e.g. node1.example.com or 198.51.100.1"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    aria-invalid={Boolean(errors.address)}
                  />
                  {errors.address && <span className="form-error-msg">{errors.address}</span>}
                </div>

                <div className="form-group form-group-sm">
                  <label htmlFor="config-port" className="form-label">
                    Port *
                  </label>
                  <input
                    id="config-port"
                    type="number"
                    min="1"
                    max="65535"
                    className={`form-input ${errors.port ? "form-input--error" : ""}`}
                    placeholder="443"
                    value={formData.port}
                    onChange={(e) => setFormData((prev) => ({ ...prev, port: e.target.value }))}
                    aria-invalid={Boolean(errors.port)}
                  />
                  {errors.port && <span className="form-error-msg">{errors.port}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="config-protocol" className="form-label">
                  Protocol
                </label>
                <select
                  id="config-protocol"
                  className="form-select"
                  value={formData.protocol}
                  onChange={(e) => setFormData((prev) => ({ ...prev, protocol: e.target.value }))}
                >
                  <option value="VLESS">VLESS</option>
                  <option value="VMESS">VMess</option>
                  <option value="Reality">Reality</option>
                  <option value="Shadowsocks">Shadowsocks</option>
                  <option value="Trojan">Trojan</option>
                </select>
              </div>
            </>
          ) : (
            <div className="form-group">
              <label htmlFor="config-url" className="form-label">
                Subscription URL *
              </label>
              <input
                id="config-url"
                type="url"
                className={`form-input ${errors.url ? "form-input--error" : ""}`}
                placeholder="https://example.com/api/v1/client/subscribe?token=..."
                value={formData.url}
                onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
                aria-invalid={Boolean(errors.url)}
              />
              {errors.url && <span className="form-error-msg">{errors.url}</span>}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEditMode ? "Save Changes" : "Add Configuration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfigModal;
