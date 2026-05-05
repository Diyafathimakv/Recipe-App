import React, { useState } from "react";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Paneer Butter Masala",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Chicken Biryani",
      image: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <div className="favorites-container">
      <h2>Your Favorites ❤️</h2>

      <div className="favorites-grid">
        {favorites.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <button className="remove-btn">❤️ Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;