import React, { useEffect, useState } from "react";

import "./index.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, []);
  const getMealsByCategory = (category) => {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  )
    .then((res) => res.json())
    .then((data) => {
      setMeals(data.meals);
    });
};

  return (
  <div className="categories-container">
    <h2>Categories</h2>

    <div className="category-buttons">
      {categories.map((item) => (
        <button
          key={item.idCategory}
          onClick={() =>
            getMealsByCategory(item.strCategory)
          }
        >
          {item.strCategory}
        </button>
      ))}
    </div>

    <div className="meals-container">
      {meals.map((meal) => (
        <div className="meal-card" key={meal.idMeal}>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />

          <h4>{meal.strMeal}</h4>
        </div>
      ))}
    </div>
  </div>
);
};

export default Categories;