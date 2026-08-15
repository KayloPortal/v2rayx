import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">V2rayX</p>
      <a
        href="https://github.com/KayloPortal/v2rayx"
        target="_blank"
        rel="noreferrer"
        className="footer-logo"
        aria-label="GitHub repository"
      >
        <img src="/icons/github.svg" alt="GitHub repository" />
      </a>
    </footer>
  );
}

export default Footer;
