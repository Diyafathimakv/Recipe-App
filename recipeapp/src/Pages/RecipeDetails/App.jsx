import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import "./App.css";

const RecipeDetails = () => {
  const { id } = useParams();

  const [meal, setMeal] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meals[0]);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;

  // Split instructions into steps
const steps = meal.strInstructions
  .split(/\r\n|\n|\.\s+/)
  .filter(
    (step) =>
      step.trim().length > 15
  );

  // Extract ingredients
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient =
      meal[`strIngredient${i}`];

    const measure =
      meal[`strMeasure${i}`];

    if (
      ingredient &&
      ingredient.trim()
    ) {
      ingredients.push(
        `${measure} ${ingredient}`
      );
    }
  }

  return (
    <div className="details-page">
      <div className="details-card">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />

        <div className="details-content">
          <h1>{meal.strMeal}</h1>

          <p>
            <strong>Category:</strong>{" "}
            {meal.strCategory}
          </p>

          <p>
            <strong>Area:</strong>{" "}
            {meal.strArea}
          </p>

          <h3>Ingredients</h3>

          <ul className="ingredients">
            {ingredients.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

          <h3>Instructions</h3>

          <ol className="steps">
            {steps.map(
              (step, index) => (
                <li key={index}>
                  {step}
                </li>
              )
            )}
          </ol>

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="yt-btn"
            >
              Watch Recipe ▶
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;