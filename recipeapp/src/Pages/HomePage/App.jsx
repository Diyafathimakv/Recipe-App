import { useEffect, useState } from "react";
import RecipeCard from "../../Components/Card/RecipeCard";
import Pagination from "../../Components/Pagination/Pagination";
import Loader from "../../Components/Loader/Loader";
import { useSearchContext } from "../../Context/SearchContext";
import "./App.css";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { query } = useSearchContext();

  const itemsPerPage = 8;

  useEffect(() => {
    const url = query
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      : "https://www.themealdb.com/api/json/v1/1/search.php?s=";

    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let mealsData = data.meals || [];

        if (query) {
          mealsData = mealsData.filter((meal) =>
            meal.strMeal
              .toLowerCase()
              .startsWith(query.toLowerCase())
          );
        }

        setMeals(mealsData);
        setLoading(false);
      });
  }, [query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentMeals = meals.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    meals.length / itemsPerPage
  );

  if (loading) return <Loader />;

  return (
    <div className="home">
      <div className="home-header">
        <h1>Craving Something Tasty? 😋</h1>
        <p>
          Scroll, discover, and start cooking!
        </p>
      </div>

      {meals.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          No recipes found 😢
        </p>
      ) : (
        <>
          <div className="card-container">
            {currentMeals.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
              />
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Home;