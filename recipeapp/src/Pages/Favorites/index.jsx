import React, { useState, useEffect } from "react";
import "./index.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  // Remove favorite
  const removeFavorite = (idMeal) => {
    const updatedFavorites = favorites.filter(
      (item) => item.idMeal !== idMeal
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <div className="favorites-container">
      <h2>Your Favorites ❤️</h2>

      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          favorites.map((item) => (
            <div className="card" key={item.idMeal}>
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
              />

              <h4>{item.strMeal}</h4>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFavorite(item.idMeal)
                }
              >
                ❤️ Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;