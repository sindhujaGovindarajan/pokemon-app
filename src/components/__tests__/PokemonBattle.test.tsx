import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonBattle from "../PokemonBattle";
import useFetchPokemon from "../../hooks/useFetch";

jest.mock("../../hooks/useFetch");

describe("PokemonBattle Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Pokémon battle UI", async () => {
    (useFetchPokemon as jest.Mock).mockReturnValue({
      fetchPokemon: jest.fn().mockResolvedValue({
        name: "pikachu",
        sprite: "pikachu.png",
        move: "thunderbolt",
        attackPower: 90,
      }),
      loading: false,
      error: null,
    });

    render(<PokemonBattle />);
    expect(await screen.findByText("Pokémon Battle")).toBeInTheDocument();
  });

  it("disables 'Start Battle' button when 'Fight Another Battle' is clicked", async () => {
    (useFetchPokemon as jest.Mock).mockReturnValue({
      fetchPokemon: jest.fn().mockResolvedValue({
        name: "bulbasaur",
        sprite: "bulbasaur.png",
        move: "vine whip",
        attackPower: 45,
      }),
      loading: false,
      error: null,
    });

    render(<PokemonBattle />);

    const fightButton = await screen.findByText("Fight Another Battle");
    const startButton = await screen.findByText("Start Battle");

    expect(startButton).toBeEnabled();
    fightButton.click();

    await waitFor(() => expect(startButton).toBeDisabled());
  });

  it("shows error if fetching fails", async () => {
    (useFetchPokemon as jest.Mock).mockReturnValue({
      fetchPokemon: jest.fn(),
      loading: false,
      error: "Failed to fetch Pokémon.",
    });

    render(<PokemonBattle />);

    await waitFor(() =>
      expect(screen.getByText("Failed to fetch Pokémon.")).toBeInTheDocument()
    );
  });
});
