import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import "./RecipeDetail.css";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Instruction {
  step: number;
  description: string;
}

interface Recipe {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags?: string[];
}

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch(() => setError("Recipe not found."));
  }, [id]);

  if (error) return <p className="error-text">{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <Link to="/recipes">← Back to recipes</Link>
      <h1>{recipe.title}</h1>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      {recipe.description && <p>{recipe.description}</p>}

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>
            {ing.quantity} {ing.name}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step) => (
          <li key={step.step}>{step.description}</li>
        ))}
      </ol>

      {recipe.tags && recipe.tags.length > 0 && (
        <p>Tags: {recipe.tags.join(", ")}</p>
      )}
    </div>
  );
}

export default RecipeDetail;
