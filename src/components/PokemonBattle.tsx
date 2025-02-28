import React from "react";
import "./PokemonBattle.css";

const PokemonBattle: React.FC = React.memo(() => {
  // TODOS:
  // set pokemon states

  // get pokemon data

  // handling fns for two buttons - startBattle and fightAnotherBattle

  // wrapper
  // title
  // return error if fetch error
  // if no error, render pokemon card comps
  // button component
  // battle log component

  // render loader inside cards if possible

  const content = " error ? error component :  render fetched content";

  return (
    <div className="battle-container">
      <h1 className="title">Pokémon Battle</h1>
      {content}
    </div>
  );
});

export default PokemonBattle;
