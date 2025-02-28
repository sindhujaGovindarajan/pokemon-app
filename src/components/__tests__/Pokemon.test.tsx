import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pokemon from "../Pokemon";

describe("Pokemon Component", () => {
  const mockPokemon = {
    name: "charizard",
    sprite: "charizard.png",
    move: "Flamethrower",
    attackPower: 90,
    side: "left" as const,
  };

  it("renders the Pokémon's name", () => {
    render(<Pokemon {...mockPokemon} />);
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
  });

  it("renders the Pokémon's sprite", () => {
    render(<Pokemon {...mockPokemon} />);
    const image = screen.getByAltText(mockPokemon.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockPokemon.name + ".png");
  });

  it("renders the Pokémon's move and attack power", () => {
    render(<Pokemon {...mockPokemon} />);
    expect(
      screen.getByText(mockPokemon.move + " : " + mockPokemon.attackPower)
    ).toBeInTheDocument();
  });

  it("applies the correct side class", () => {
    render(<Pokemon {...mockPokemon} />);
    const infoElement = screen.getByText(
      mockPokemon.move + " : " + mockPokemon.attackPower
    );
    expect(infoElement).toHaveClass("left");
  });
});
