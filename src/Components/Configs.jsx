import "./Configs.css";

function Configs() {
  return (
    <div className="configs">
      <Config />
      <Config />
      <Config />
      <Config />
      <Config />
      <Config />
    </div>
  );
}

function Config(){
  return (
      <div className="config">
        <div>
          <h3 className="config-name">shecan 123584652</h3>
          <div className="config-btns">
            <button>
              <img src="/public/icons/share-2.svg" alt="Copy config" />
            </button>
            <button>
              <img src="/public/icons/edit.svg" alt="Edit config" />
            </button>
            <button>
              <img src="/public/icons/trash-2.svg" alt="Delete config" />
            </button>
          </div>
        </div>
        <div>
          <div>
            <p className="config-address">2.shecan.market.**</p>
          </div>
          <div className="config-details">
            <p className="config-protocol">VLESS</p>
            <img src="/public/icons/wifi-green.svg" alt="" />
            <p className="config-ping">43ms</p>
          </div>
        </div>
      </div>
  )
}

export default Configs;
