import { FiHeart } from "react-icons/fi";
import { GiCookingPot } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark"><GiCookingPot aria-hidden="true" /></span>
          <span>swagata<span className="brand-dot">.</span></span>
        </Link>
        <p>Good food brings us together. Find your next favorite, one recipe at a time.</p>
        <span className="footer-credit">Made with <FiHeart aria-label="love" /> for home cooks</span>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Swagata Recipe Finder</span><Link to="/recipes">Explore recipes <span aria-hidden="true">→</span></Link></div>
    </footer>
  );
}
