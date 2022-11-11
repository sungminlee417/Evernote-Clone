import "./Footer.css";

const Footer = () => {
    return (
      <section className="footer-section">
        <div className="footer-content">
          <div className="social-media-links">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/sungminlee417"
              className="git-link"
            >
              <span class="contributor-name">Sungmin Lee</span>
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/hannahlee2"
              className="git-link"
            >
              <span class="contributor-name">Hannah Lee</span>
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </section>
    );
  };
  
export default Footer;