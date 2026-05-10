import React, {
  useState,
  useEffect
} from "react";

import RecipeCard from "../../Components/Card/RecipeCard";
import Loader from "../../Components/Loader/Loader";
import { useSearchContext } from "../../Context/SearchContext";

import "./index.css";

const Favorites = () => {
  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { query } =
    useSearchContext();

  useEffect(() => {
    const savedFavorites =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || [];

    setFavorites(savedFavorites);
    setLoading(false);
  }, []);

  const filteredFavorites =
    favorites.filter((meal) =>
      meal.strMeal
        .toLowerCase()
        .startsWith(
          query.toLowerCase()
        )
    );

  if (loading) return <Loader />;

  return (
    <div className="favorites-container">
      <h2>Your Favorites ❤️</h2>

      {filteredFavorites.length ===
      0 ? (
        <p className="empty-text">
          No favorites found 😢
        </p>
      ) : (
        <div className="favorites-grid">
          {filteredFavorites.map(
            (meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;