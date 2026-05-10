import React,{useEffect,useState} from 'react'

import RecipeCard from "../../Components/Card/RecipeCard";
import Pagination from "../../Components/Pagination/Pagination";
import Loader from "../../Components/Loader/Loader";
import { useSearchContext } from "../../Context/SearchContext";

import "./index.css";

const Categories = () => {
  const [categories, setCategories] =useState([]);
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] =useState(1);
  const [activeCategory, setActiveCategory] =useState("");
  const [loading, setLoading] =useState(true);
  const { query } = useSearchContext();

  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);

    fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);

        if (data.categories.length > 0) {
          getMealsByCategory(
            data.categories[0].strCategory
          );
        }
      });
  }, []);

  const getMealsByCategory = (
    category
  ) => {
    setLoading(true);

    setActiveCategory(category);
    setCurrentPage(1);

    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMeals(
          data.meals.map((meal) => ({
            ...meal,
            strCategory: category,
          }))
        );

        setLoading(false);
      });
  };

  const indexOfLast =currentPage * itemsPerPage;
  const indexOfFirst =indexOfLast - itemsPerPage;
const filteredMeals = meals.filter((meal) =>
  meal.strMeal
    .toLowerCase()
    .startsWith(query.toLowerCase())
);

const currentMeals = filteredMeals.slice(
  indexOfFirst,
  indexOfLast
);
 const totalPages = Math.ceil(
  filteredMeals.length / itemsPerPage
);

  if (loading) return <Loader />;

  return (
    <div className="categories-container">
      <h2>Categories</h2>

 <div className="category-buttons">
  {categories.map((item) => (
    <button
      key={item.idCategory}
      className={
        activeCategory === item.strCategory
          ? "active-category"
          : ""
      }
      onClick={() =>
        getMealsByCategory(
          item.strCategory
        )
      }
    >
      {item.strCategory}
    </button>
  ))}
</div>

<select
  className="category-dropdown"
  value={activeCategory}
  onChange={(e) =>
    getMealsByCategory(
      e.target.value
    )
  }
>
  {categories.map((item) => (
    <option
      key={item.idCategory}
      value={item.strCategory}
    >
      {item.strCategory}
    </option>
  ))}
</select>

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
    </div>
  );
};

export default Categories;