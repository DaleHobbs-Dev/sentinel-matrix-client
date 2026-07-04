import { Link } from "react-router-dom";
import { Text } from "@/components";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
        <div className="footer-content">
            <Text>&copy; {currentYear} Your Company. All rights reserved.</Text>
            <nav className="footer-nav">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-of-service">Terms of Service</Link>
                <Link to="/contact">Contact Us</Link>
            </nav>
        </div>
    </footer>
  );
}
