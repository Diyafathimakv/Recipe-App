import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Pages/Auth/Firebase"; // adjust path
import { useSearchContext } from "../../Context/SearchContext";
import './App.css'

const Header = () => {
  const navigate = useNavigate();
  const { query, setQuery } = useSearchContext(); 

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
      <div className="logo">🍲 RecipeApp</div>

      {/* Nav */}
      <nav className="nav-center">
        <Link to="/home">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>

      {/* Right Section */}
      <div className="right-section">

          <input
      type="text"
      placeholder="Search recipes..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search"
    />

        {/* Profile */}
        <Link to="/profile" className="profile">
          👤
        </Link>

        {/* Logout */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </header>
  );
};

export default Header;