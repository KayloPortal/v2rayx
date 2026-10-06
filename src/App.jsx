import { useState } from "react";
import "./App.css";
import Configs from "./Components/Configs";
import Subscriptions from "./Components/Subscriptions";
import Section from "./Components/Section";
import Start from "./Components/Start";
import Footer from "./Footer";
import ConfigModal from "./Components/ConfigModal";
import Toast from "./Components/Toast";

const INITIAL_CONFIGS = [
  {
    id: "srv-1",
    title: "shecan 123584652",
    address: "2.shecan.market.ir",
    port: "443",
    protocol: "VLESS",
    ping: "43",
  },
  {
    id: "srv-2",
    title: "Frankfurt HighSpeed",
    address: "10.125.231.24",
    port: "443",
    protocol: "VMESS",
    ping: "185",
  },
  {
    id: "srv-3",
    title: "Helsinki Reality Node",
    address: "fi-relay.market.net",
    port: "8443",
    protocol: "Reality",
    ping: "320",
  },
];

const INITIAL_SUBSCRIPTIONS = [
  {
    id: "sub-1",
    name: "VIP Premium Servers",
    url: "https://subscribe.market.net/api/v1/client/vip?token=a8f9b2c1",
    count: 8,
    lastUpdated: "Today, 12:45",
  },
];

function App() {
  const [configs, setConfigs] = useState(INITIAL_CONFIGS);
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  const [selectedConfigId, setSelectedConfigId] = useState(INITIAL_CONFIGS[0]?.id || null);
  const [activeTab, setActiveTab] = useState("servers");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [modalState, setModalState] = useState({ isOpen: false, mode: "add-server", data: null });
  const [toast, setToast] = useState({ message: "", type: "info" });

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const selectedConfig = configs.find((c) => c.id === selectedConfigId) || null;

  // Toggle Connection Handler
  const handleToggleConnect = () => {
    if (connectionStatus === "connected") {
      setConnectionStatus("disconnected");
      showToast("Disconnected from proxy", "info");
    } else if (connectionStatus === "disconnected") {
      if (!selectedConfig) {
        showToast("Please add or select a server first", "error");
        return;
      }
      setConnectionStatus("connecting");
      setTimeout(() => {
        setConnectionStatus("connected");
        showToast(`Connected to ${selectedConfig.title}`, "success");
      }, 700);
    } else if (connectionStatus === "connecting") {
      setConnectionStatus("disconnected");
      showToast("Connection canceled", "info");
    }
  };

  // Config Handlers
  const handleSelectConfig = (id) => {
    setSelectedConfigId(id);
    const target = configs.find((c) => c.id === id);
    if (target && connectionStatus === "connected") {
      showToast(`Switched active server to ${target.title}`, "info");
    }
  };

  const handleRemoveConfig = (id) => {
    const target = configs.find((c) => c.id === id);
    setConfigs((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      if (selectedConfigId === id) {
        setSelectedConfigId(updated[0]?.id || null);
        if (connectionStatus === "connected" && updated.length === 0) {
          setConnectionStatus("disconnected");
        }
      }
      return updated;
    });
    showToast(`Removed "${target?.title || "Server"}"`, "info");
  };

  const handleCopyConfig = async (config) => {
    const uri = `${config.protocol.toLowerCase()}://${config.address}:${config.port || 443}#${encodeURIComponent(config.title)}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(uri);
      }
      showToast(`Copied configuration URI for ${config.title}`, "success");
    } catch {
      showToast("Failed to copy to clipboard", "error");
    }
  };

  const handleEditConfig = (config) => {
    setModalState({
      isOpen: true,
      mode: "edit-server",
      data: config,
    });
  };

  // Subscription Handlers
  const handleRemoveSubscription = (id) => {
    const target = subscriptions.find((s) => s.id === id);
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    showToast(`Removed subscription "${target?.name || "Subscription"}"`, "info");
  };

  const handleCopySubscription = async (sub) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(sub.url);
      }
      showToast(`Copied subscription URL for ${sub.name}`, "success");
    } catch {
      showToast("Failed to copy to clipboard", "error");
    }
  };

  const handleEditSubscription = (sub) => {
    setModalState({
      isOpen: true,
      mode: "edit-sub",
      data: sub,
    });
  };

  const handleUpdateSubscription = (id) => {
    const target = subscriptions.find((s) => s.id === id);
    const newNodesCount = Math.floor(Math.random() * 5 + 6);

    setSubscriptions((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, count: newNodesCount, lastUpdated: "Just now" }
          : s
      )
    );
    showToast(`Updated "${target?.name}": ${newNodesCount} servers synchronized`, "success");
  };

  // Modal Handlers
  const handleOpenAddModal = () => {
    setModalState({
      isOpen: true,
      mode: activeTab === "servers" ? "add-server" : "add-sub",
      data: null,
    });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: "add-server", data: null });
  };

  const handleModalSubmit = (item) => {
    if (modalState.mode === "add-server") {
      setConfigs((prev) => [item, ...prev]);
      if (!selectedConfigId) {
        setSelectedConfigId(item.id);
      }
      showToast(`Added server "${item.title}"`, "success");
    } else if (modalState.mode === "edit-server") {
      setConfigs((prev) => prev.map((c) => (c.id === item.id ? item : c)));
      showToast(`Updated server "${item.title}"`, "success");
    } else if (modalState.mode === "add-sub") {
      setSubscriptions((prev) => [item, ...prev]);
      showToast(`Added subscription "${item.name}"`, "success");
    } else if (modalState.mode === "edit-sub") {
      setSubscriptions((prev) => prev.map((s) => (s.id === item.id ? item : s)));
      showToast(`Updated subscription "${item.name}"`, "success");
    }
  };

  return (
    <main className="container">
      <Start
        status={connectionStatus}
        selectedConfig={selectedConfig}
        onToggleConnect={handleToggleConnect}
      />

      <Section
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={handleOpenAddModal}
        serverCount={configs.length}
        subscriptionCount={subscriptions.length}
      />

      {activeTab === "servers" ? (
        <Configs
          configs={configs}
          selectedConfigId={selectedConfigId}
          onSelectConfig={handleSelectConfig}
          onRemoveConfig={handleRemoveConfig}
          onEditConfig={handleEditConfig}
          onCopyConfig={handleCopyConfig}
          onAddClick={handleOpenAddModal}
        />
      ) : (
        <Subscriptions
          subscriptions={subscriptions}
          onUpdateSubscription={handleUpdateSubscription}
          onRemoveSubscription={handleRemoveSubscription}
          onEditSubscription={handleEditSubscription}
          onCopySubscription={handleCopySubscription}
          onAddClick={handleOpenAddModal}
        />
      )}

      <Footer />

      <ConfigModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        initialData={modalState.data}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />
    </main>
  );
}

export default App;

