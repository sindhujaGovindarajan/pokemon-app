import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import useFetchPokemon from "../hooks/useFetch";
import useToggle from "../hooks/useToggle";
import { capitalizeName } from "../utils/helpers";
import "./PokemonBattle.css";

const Error = lazy(() => import("./Error"));
const Loader = lazy(() => import("./Loader"));
const BattleButton = lazy(() => import("./BattleButton"));
const Pokemon = lazy(() => import("./Pokemon"));

interface PokemonData {
  name: string;
  sprite: string;
  move: string;
  attackPower: number;
}

const PokemonBattle: React.FC = React.memo(() => {
  const [pokemon1, setPokemon1] = useState<PokemonData | null>(null);
  const [pokemon2, setPokemon2] = useState<PokemonData | null>(null);
  const [battleLog, setBattleLog] = useState<string>("-");
  const [disableStart, toggleDisableStart] = useToggle(false);
  const { fetchPokemon, loading, error } = useFetchPokemon();

  useEffect(() => {
    const fetchPokemons = async () => {
      setPokemon1(await fetchPokemon());
      setPokemon2(await fetchPokemon());
    };
    fetchPokemons();
  }, [fetchPokemon]);

  const startBattle = useCallback(() => {
    if (!pokemon1 || !pokemon2) return;
    let result = "";

    if (pokemon1.attackPower > pokemon2.attackPower) {
      result = `${capitalizeName(pokemon1.name)} lands a decisive blow with ${
        pokemon1.move
      }, knocking out ${capitalizeName(pokemon2.name)}!`;
    } else if (pokemon2.attackPower > pokemon1.attackPower) {
      result = `${capitalizeName(pokemon2.name)} lands a decisive blow with ${
        pokemon2.move
      }, knocking out ${capitalizeName(pokemon1.name)}!`;
    } else {
      result = `It's a draw between ${capitalizeName(
        pokemon1.name
      )} and ${capitalizeName(pokemon2.name)}!`;
    }

    setBattleLog(result);
  }, [pokemon1, pokemon2]);

  const fightAnotherBattle = useCallback(async () => {
    setBattleLog("-");
    toggleDisableStart(true);
    setPokemon1(await fetchPokemon());
    setPokemon2(await fetchPokemon());
    toggleDisableStart(false);
  }, [fetchPokemon, toggleDisableStart]);

  // TODO: render loader inside cards instead

  const content = error ? (
    <Suspense fallback={<div>Loading Error...</div>}>
      <Error message={error} />
    </Suspense>
  ) : (
    <>
      <div className="battle-field">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Suspense fallback={<Loader />}>
              {pokemon1 && <Pokemon {...pokemon1} side="left" />}
            </Suspense>
            <h2 className="vs-text">VS</h2>
            <Suspense fallback={<Loader />}>
              {pokemon2 && <Pokemon {...pokemon2} side="right" />}
            </Suspense>
          </>
        )}
      </div>
      <div className="button-container">
        <BattleButton onClick={startBattle} disabled={disableStart}>
          Start Battle
        </BattleButton>
        <BattleButton onClick={fightAnotherBattle}>
          Fight Another Battle
        </BattleButton>
      </div>
      {/* TODO: Modularize BattleLog */}
      <div className="battle-log-container">
        <h3 className="battle-log-title">Battle Log</h3>
        <p className="battle-log">{battleLog}</p>
      </div>
    </>
  );

  return (
    <div className="battle-container">
      <h1 className="title">Pokémon Battle</h1>
      {content}
    </div>
  );
});

export default PokemonBattle;
