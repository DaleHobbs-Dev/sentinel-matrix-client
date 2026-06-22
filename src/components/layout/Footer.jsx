import { Link } from "react-router-dom";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
        <div className="footer-content">
            <p>&copy; {currentYear} Your Company. All rights reserved.</p>
            <nav className="footer-nav">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-of-service">Terms of Service</Link>
                <Link to="/contact">Contact Us</Link>
            </nav>
        </div>
    </footer>
  );
}
