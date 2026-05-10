import React, { useEffect, useState } from "react";
import { auth } from "../Auth/Firebase.jsx";
import RecipeCard from "../../Components/Card/RecipeCard";
import Loader from "../../Components/Loader/Loader";
import "./index.css";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) setEmail(user.email);

    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
    setLoading(false);
  }, []);

  const recentFavorites = favorites.slice(0, 3);

  if (loading) return <Loader />;

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      <div className="profile-card">
        <p className="label">User Email</p>
        <p className="value">{email || "Not logged in"}</p>
      </div>

      <div className="stats-row">
        <div className="stats-card">
          <p className="stats-title">Favorites Added</p>
          <p className="stats-value">{favorites.length}</p>
        </div>
      </div>

      <div className="recent-section">
        <h3>Recent Favorites</h3>

        {recentFavorites.length === 0 ? (
          <p className="empty-text">
            No favorites added yet.
          </p>
        ) : (
          <div className="recent-grid">
           {recentFavorites.map((item, index) => (
  <RecipeCard
    key={item.idMeal || index}
    meal={item}
  />
))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;