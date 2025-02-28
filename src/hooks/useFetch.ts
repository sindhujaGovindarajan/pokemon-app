import { useState, useCallback } from "react";
import axios from "axios";

interface PokemonData {
  name: string;
  sprite: string;
  move: string;
  attackPower: number;
}

const getRandomPokemonId = (): number => Math.floor(Math.random() * 898) + 1;

const useFetchPokemon = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = useCallback(async (): Promise<PokemonData | null> => {
    try {
      setLoading(true);
      setError(null);
      const id = getRandomPokemonId();
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const moves = response.data.moves;
      if (moves.length === 0) return null;
      const randomMove = moves[Math.floor(Math.random() * moves.length)].move;
      const moveResponse = await axios.get(randomMove.url);

      return {
        name: response.data.name,
        sprite: response.data.sprites.front_default,
        move: moveResponse.data.name,
        attackPower: moveResponse.data.power || 0,
      };
    } catch (err) {
      console.error("Error fetching Pokémon:", err);
      setError("Failed to fetch Pokémon. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchPokemon, loading, error };
};

export default useFetchPokemon;
