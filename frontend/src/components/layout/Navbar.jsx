import { FiHeart, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { GiCookingPot } from "react-icons/gi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="Swagata Recipe Finder home">
          <span className="brand-mark"><GiCookingPot aria-hidden="true" /></span>
          <span>swagata<span className="brand-dot">.</span></span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          <NavLink to="/" onClick={closeMenu} end>Home</NavLink>
          <NavLink to="/recipes" onClick={closeMenu}>Discover recipes</NavLink>
          {isAuthenticated && <NavLink to="/favorites" onClick={closeMenu}><FiHeart aria-hidden="true" /> My favorites</NavLink>}
          {isAuthenticated ? (
            <div className="nav-account">
              <span className="nav-greeting">Hi, {user?.name?.split(" ")[0] || "cook"}</span>
              <button className="button button-outline button-small" type="button" onClick={handleLogout}>
                <FiLogOut aria-hidden="true" /> Log out
              </button>
            </div>
          ) : (
            <div className="nav-account">
              <Link className="nav-login" to="/login" onClick={closeMenu}>Log in</Link>
              <Link className="button button-primary button-small" to="/register" onClick={closeMenu}>Join the table</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
