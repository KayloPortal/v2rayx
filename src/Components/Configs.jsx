import "./Configs.css";

const configs = [
  {
    "title": "shecan 123584652",
    "address": "2.shecan.market.**",
    "protocol": "VLESS",
    "ping": "43",
  },
  {
    "title": "shecan",
    "address": "10.125.231.24",
    "protocol": "VMESS",
    "ping": "200",
  },
  {
    "title": "v",
    "address": "market.**",
    "protocol": "Reality",
    "ping": "320",
  }
]

function Configs() {
  return (
    <div className="configs">
      {configs.map(info => <Config data={info} />)}
    </div>
  );
}

function Config({data: {title, address, protocol, ping}}){
  return (
      <div className="config">
        <div>
          <h3 className="config-name">{title}</h3>
          <div className="config-btns">
            <button>
              <img src="/icons/share-2.svg" alt="Copy config" />
            </button>
            <button>
              <img src="/icons/edit.svg" alt="Edit config" />
            </button>
            <button>
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
