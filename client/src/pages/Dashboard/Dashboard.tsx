import { useEffect, useState } from "react";
import api from "../../api/axios";
import { getCurrentUser } from "../../utils/auth";
import RecipeForm, {
  type RecipeFormData,
} from "../../components/RecipeForm/RecipeForm";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./Dashboard.css";

interface Recipe extends RecipeFormData {
  _id: string;
  ownerId: string;
  createdAt?: string;
}

function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const currentUser = getCurrentUser();

  const loadMyRecipes = () => {
    api
      .get("/api/recipes")
      .then((res) => {
        const mine = res.data.filter(
          (r: Recipe) => r.ownerId === currentUser?._id,
        );
        setRecipes(mine);
      })
      .catch(() => setError("Could not load your recipes."));
  };

  useEffect(() => {
    loadMyRecipes();
  }, []);

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const handleCreate = (data: RecipeFormData) => {
    api
      .post("/api/recipes", data, authHeader)
      .then(() => {
        setMessage("Recipe created!");
        setShowForm(false);
        loadMyRecipes();
      })
      .catch(() => setError("Failed to create recipe."));
  };

  const handleUpdate = (data: RecipeFormData) => {
    if (!editingRecipe) return;
    api
      .put(`/api/recipes/${editingRecipe._id}`, data, authHeader)
      .then(() => {
        setMessage("Recipe updated!");
        setEditingRecipe(null);
        loadMyRecipes();
      })
      .catch(() => setError("Failed to update recipe."));
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?",
    );
    if (!confirmed) return;

    api
      .delete(`/api/recipes/${id}`, authHeader)
      .then(() => {
        setMessage("Recipe deleted.");
        loadMyRecipes();
      })
      .catch(() => setError("Failed to delete recipe."));
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {!showForm && !editingRecipe && (
        <button onClick={() => setShowForm(true)}>Create New Recipe</button>
      )}

      {showForm && (
        <RecipeForm
          submitLabel="Create Recipe"
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingRecipe && (
        <RecipeForm
          initialData={editingRecipe}
          submitLabel="Save Changes"
          onSubmit={handleUpdate}
          onCancel={() => setEditingRecipe(null)}
        />
      )}

      <h2>Your Recipes</h2>
      {recipes.length === 0 && <p>You haven't created any recipes yet.</p>}
      <div className="dashboard-recipes">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            image={recipe.image}
            tags={recipe.tags}
            createdAt={recipe.createdAt}
            onEdit={() => {
              setEditingRecipe(recipe);
              setShowForm(false);
            }}
            onDelete={() => handleDelete(recipe._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
