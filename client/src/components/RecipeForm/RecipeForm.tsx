import { useState, useEffect, type FormEvent } from "react";
import "./RecipeForm.css";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Instruction {
  step: number;
  description: string;
}

export interface RecipeFormData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: Instruction[];
}

interface RecipeFormProps {
  initialData?: RecipeFormData;
  onSubmit: (data: RecipeFormData) => void;
  onCancel?: () => void;
  submitLabel: string;
}

const emptyForm: RecipeFormData = {
  title: "",
  description: "",
  image: "",
  tags: [],
  ingredients: [{ name: "", quantity: "" }],
  instructions: [{ step: 1, description: "" }],
};

function RecipeForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel,
}: RecipeFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: "" },
  ]);
  const [instructions, setInstructions] = useState<Instruction[]>([
    { step: 1, description: "" },
  ]);

  useEffect(() => {
    const data = initialData || emptyForm;
    setTitle(data.title);
    setDescription(data.description);
    setImage(data.image);
    setTagsInput(data.tags.join(", "));
    setIngredients(
      data.ingredients.length ? data.ingredients : [{ name: "", quantity: "" }],
    );
    setInstructions(
      data.instructions.length
        ? data.instructions
        : [{ step: 1, description: "" }],
    );
  }, [initialData]);

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string,
  ) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = { ...updated[index], description: value };
    setInstructions(updated);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const cleanedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const numberedInstructions = instructions.map((step, i) => ({
      step: i + 1,
      description: step.description,
    }));

    onSubmit({
      title,
      description,
      image,
      tags: cleanedTags,
      ingredients,
      instructions: numberedInstructions,
    });
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Image URL</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div>
        <label>Tags (comma separated)</label>
        <input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="vegan, dinner"
        />
      </div>

      <div>
        <label>Ingredients</label>
        {ingredients.map((ing, i) => (
          <div className="form-row" key={i}>
            <input
              placeholder="Quantity"
              value={ing.quantity}
              onChange={(e) => updateIngredient(i, "quantity", e.target.value)}
              required
            />
            <input
              placeholder="Name"
              value={ing.name}
              onChange={(e) => updateIngredient(i, "name", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() =>
                setIngredients(ingredients.filter((_, idx) => idx !== i))
              }
              disabled={ingredients.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setIngredients([...ingredients, { name: "", quantity: "" }])
          }
        >
          Add Ingredient
        </button>
      </div>

      <div>
        <label>Instructions</label>
        {instructions.map((step, i) => (
          <div className="form-row" key={i}>
            <span>Step {i + 1}</span>
            <textarea
              value={step.description}
              onChange={(e) => updateInstruction(i, e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() =>
                setInstructions(instructions.filter((_, idx) => idx !== i))
              }
              disabled={instructions.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setInstructions([
              ...instructions,
              { step: instructions.length + 1, description: "" },
            ])
          }
        >
          Add Step
        </button>
      </div>

      <button type="submit">{submitLabel}</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default RecipeForm;
