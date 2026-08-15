import { useState } from "react";
import "./Configs.css";

const configsData = [
  {
    "title": "shecan 123584652",
    "address": "2.shecan.market.**",
    "protocol": "VLESS",
    "ping": "43",
    "id": "asddsa"
  },
  {
    "title": "shecan",
    "address": "10.125.231.24",
    "protocol": "VMESS",
    "ping": "200",
    "id": "assdsdsdda"
  },
  {
    "title": "v",
    "address": "market.**",
    "protocol": "Reality",
    "ping": "320",
    "id": "asda"
    }
]

function Configs() {
  const [configs, setConfigs] = useState(configsData)
  const [selectedConfigId, setSelectedConfigId] = useState(configsData[0]? configsData[0].id : -1)

  function removeConfigHandler(id) {
    setConfigs(prev => {
      const updated = prev.filter(config => config.id !== id);
      if (selectedConfigId === id) {
        setSelectedConfigId(updated[0] ? updated[0].id : -1);
      }
      return updated;
    });
  }

  function clickHandler(id) {
    setSelectedConfigId(id);
  }

  return (
    <div className="configs">
      {configs.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888", padding: "2rem" }}>
          <p>No configurations available</p>
        </div>
      ) : (
        configs.map(info => (
          <Config
            clickHandler={clickHandler}
            isSelected={selectedConfigId === info.id}
            key={info.id}
            data={info}
            removeConfigHandler={removeConfigHandler}
          />
        ))
      )}
    </div>
  );
}

function Config({data: {title, address, protocol, ping, id}, clickHandler, removeConfigHandler, isSelected}){
  return (
      <div onClick={() => clickHandler(id)} className={`config ${isSelected? "config--selected" : ""}`}>
        <div>
          <h3 className="config-name">{title}</h3>
          <div className="config-btns">
            <button onClick={(e) => e.stopPropagation()} aria-label="Copy config">
              <img src="/icons/share-2.svg" alt="Copy config" />
            </button>
            <button onClick={(e) => e.stopPropagation()} aria-label="Edit config">
              <img src="/icons/edit.svg" alt="Edit config" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); removeConfigHandler(id); }} aria-label="Delete config">
              <img src="/icons/trash-2.svg" alt="Delete config" />
            </button>
          </div>
        </div>
        <div>
          <div>
            <p className="config-address">{address}</p>
          </div>
          <div className="config-details">
            <p className="config-protocol">{protocol}</p>
            <img src={`/icons/wifi-${Number(ping) < 100 ? "green" : "red"}.svg`} alt="" />
            <p className="config-ping">{ping}</p>
          </div>
        </div>
      </div>
  )
}

export default Configs;
