import React from "react";
import "./PokemonBattle.css";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const BattleButton: React.FC<ButtonProps> = React.memo(
  ({ onClick, disabled = false, children }) => {
    return (
      <button
        className="battle-button"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

export default BattleButton;
