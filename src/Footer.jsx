import "./Footer.css";

const GITHUB_REPO_URL = "https://github.com/KayloPortal/v2rayx";

function Footer() {
  const handleOpenLink = async (e) => {
    e.preventDefault();
    try {
      const { openUrl } = await import("@tauri-apps/plugin-opener");
      await openUrl(GITHUB_REPO_URL);
    } catch {
      window.open(GITHUB_REPO_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-info">
        <span className="footer-text">V2rayX</span>
        <span className="footer-version">v0.1.0</span>
      </div>
      <a
        href={GITHUB_REPO_URL}
        onClick={handleOpenLink}
        className="footer-logo"
        aria-label="Visit V2rayX GitHub repository"
        title="View on GitHub"
      >
        <img
          src="/icons/github.svg"
          alt=""
          aria-hidden="true"
        />
      </a>
    </footer>
  );
}

export default Footer;

