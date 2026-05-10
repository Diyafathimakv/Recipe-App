import React, { useEffect, useState } from "react";
import { auth } from "../Auth/Firebase.jsx";
import "./index.css";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Firebase user email
    const user = auth.currentUser;
    if (user) setEmail(user.email);

    // LocalStorage favorites
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const recentFavorites = favorites.slice(0, 3);

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      {/* User Info */}
      <div className="profile-card">
        <p className="label">User Email</p>
        <p className="value">{email || "Not logged in"}</p>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stats-card">
          <p className="stats-title">Favorites Added</p>
          <p className="stats-value">{favorites.length}</p>
        </div>
      </div>

      {/* Recent Favorites */}
      <div className="recent-section">
        <h3>Recent Favorites</h3>

        {recentFavorites.length === 0 ? (
          <p className="empty-text">No favorites added yet.</p>
        ) : (
          <div className="recent-grid">
            {recentFavorites.map((item) => (
              <div className="recent-card" key={item.idMeal}>
                <img src={item.strMealThumb} alt={item.strMeal} />
                <h4>{item.strMeal}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;