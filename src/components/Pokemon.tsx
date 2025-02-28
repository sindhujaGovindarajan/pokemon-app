import React from "react";
import "./PokemonBattle.css";

interface PokemonProps {
  name: string;
  sprite: string;
  move: string;
  attackPower: number;
  side: "left" | "right";
}

const Pokemon: React.FC<PokemonProps> = React.memo(
  ({ name, sprite, move, attackPower, side = "left" }) => {
    return (
      <div className="pokemon-card">
        {/* pokemonName */}
        <h2 className="pokemon-info">{name}</h2>

        {/* pokemonImage */}
        <img src={sprite} alt={name} className="pokemon-image" />

        {/* pokemonInfo */}
        <p className={`pokemon-info ${side}`}>
          {move} : {attackPower}
        </p>
      </div>
    );
  }
);

export default Pokemon;
