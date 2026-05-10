import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Pages/Auth/Firebase";
import { useSearchContext } from "../../Context/SearchContext";
import { useState } from "react";
import Logo from "../../assets/Logoo.png";
import "./App.css";

const Header = () => {
  const navigate = useNavigate();
  const { query, setQuery } = useSearchContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        RecipeApp
      </div>

      {/* Desktop Nav */}
      <nav className="nav-center desktop-nav">
        <Link to="/home">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>

      {/* Right */}
      <div className="right-section">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search"
        />

        <Link to="/profile" className="profile">
          👤
        </Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <button
          className="logout-btn desktop-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/home">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/favorites">Favorites</Link>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;