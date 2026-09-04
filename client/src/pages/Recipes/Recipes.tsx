import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./Recipes.css";

interface Recipe {
  _id: string;
  title: string;
  image?: string;
  tags?: string[];
  createdAt?: string;
}

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/recipes")
      .then((res) => setRecipes(res.data))
      .catch(() => setError("Could not load recipes."));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="recipes-page">
      <h1>Browse Recipes</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="error-text">{error}</p>}
      {filteredRecipes.length === 0 && !error && <p>No recipes found.</p>}

      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            image={recipe.image}
            tags={recipe.tags}
            createdAt={recipe.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
