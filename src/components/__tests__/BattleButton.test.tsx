import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BattleButton from "../BattleButton";

describe("BattleButton Component", () => {
  it("renders button with correct text", () => {
    render(<BattleButton onClick={() => {}}>Start Battle</BattleButton>);
    expect(screen.getByText("Start Battle")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<BattleButton onClick={handleClick}>Click Me</BattleButton>);

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when `disabled` prop is true", () => {
    render(
      <BattleButton onClick={() => {}} disabled={true}>
        Disabled
      </BattleButton>
    );
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
});
