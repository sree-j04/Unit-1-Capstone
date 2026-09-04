import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeCard from "./RecipeCard";

describe("RecipeCard", () => {
  it("renders the recipe title and tags", () => {
    render(
      <MemoryRouter>
        <RecipeCard id="1" title="Chickpea Stew" tags={["Vegan", "Easy"]} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Chickpea Stew")).toBeInTheDocument();
    expect(screen.getByText("Vegan")).toBeInTheDocument();
    expect(screen.getByText("Easy")).toBeInTheDocument();
  });

  it("calls onDelete when the delete button is clicked", () => {
    const handleDelete = vi.fn();
    render(
      <MemoryRouter>
        <RecipeCard id="1" title="Chickpea Stew" onDelete={handleDelete} />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByLabelText("Delete recipe"));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
