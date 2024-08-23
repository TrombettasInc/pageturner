import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="social-links">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
            <div className="footer-content">
                <p>&copy; 2024 TrombettasInc. <br />
                    All rights reserved</p>
                <a href="https://github.com/TrombettasInc/pageturner">Link to Repo</a>
            </div>
        </footer>
    );
}

export default Footer;