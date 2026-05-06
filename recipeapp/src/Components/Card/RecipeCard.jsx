import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./RecipeCard.css";

const RecipeCard = ({ meal }) => {
  const [isFav, setIsFav] = useState(false);

  // 🔹 Load favorite status
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];

    setIsFav(
      favs.some((item) => item.idMeal === meal.idMeal)
    );
  }, [meal.idMeal]);

  // 🔹 Toggle favorite
  const toggleFav = () => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyExists = favs.find(
      (item) => item.idMeal === meal.idMeal
    );

    if (alreadyExists) {
      favs = favs.filter(
        (item) => item.idMeal !== meal.idMeal
      );

      setIsFav(false);
    } else {
      favs.push(meal);

      setIsFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
  };

  return (
    <div className="card">

      {/* 🔹 IMAGE */}
      <div className="card-img">
        <img src={meal.strMealThumb} alt={meal.strMeal} />

        {/* ❤️ Favorite Icon */}
        <div className="fav-wrapper" onClick={toggleFav}>
          {isFav ? (
            <FaHeart className="fav-icon active" />
          ) : (
            <FaRegHeart className="fav-icon" />
          )}
        </div>
      </div>

      {/* 🔹 CONTENT */}
      <div className="card-body">
        <h3>{meal.strMeal}</h3>
        <p>{meal.strCategory}</p>

        <button className="view-btn">
          View Recipe
        </button>
      </div>

    </div>
  );
};

export default RecipeCard;