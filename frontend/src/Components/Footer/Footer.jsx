import './Footer.css'
import {NavLink} from "react-router-dom";

function Footer() {
    return(
        <footer className="footer">
            <div className="footer_element">
                <a className="footer_text"
                   target="_blank"
                   rel="noreferrer"
                   href="https://robinlant.dev/report-book-writer">
                    GitHub
                </a>
            </div>
            <div className="footer_element">
                <NavLink to="/contact" end>
                    <span className="footer_text">
                        Kontakt
                    </span>
                </NavLink>
            </div>
            <div className="footer_element">
                <NavLink to="/legal" end>
                    <span className="footer_text">
                        Rechtlicher Hinweis
                    </span>
                </NavLink>
            </div>
        </footer>
    );
}

export default Footer;