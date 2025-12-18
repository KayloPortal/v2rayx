import "./Section.css";

function Section() {
  return (
    <div className="header">
      <span className="header-texts">
        <button>Servers <span className="line"></span></button>
        <button>Subscriptions <span className="line"></span></button>
      </span>
      <button className="header-btn">
        <p>Add</p><img src="/icons/plus.svg" alt="Add" />
      </button>
    </div>
  );
}

export default Section;
