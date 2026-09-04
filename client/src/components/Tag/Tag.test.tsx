import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Tag from "./Tag";

describe("Tag", () => {
  it("renders the label text", () => {
    render(<Tag label="Vegan" />);
    expect(screen.getByText("Vegan")).toBeInTheDocument();
  });
});
