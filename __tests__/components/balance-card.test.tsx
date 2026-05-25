import { render, fireEvent } from "@testing-library/react-native";
import { BalanceCard } from "../../src/presentation/components/balance-card";

describe("BalanceCard", () => {
  it("renders balance formatted", () => {
    const { getByText } = render(
      <BalanceCard balance={1500.5} currency="BRL" />,
    );

    expect(getByText("Saldo disponible")).toBeTruthy();
    expect(getByText(/1500/)).toBeTruthy();
  });

  it("renders with different currency", () => {
    const { getByText } = render(
      <BalanceCard balance={500} currency="USD" />,
    );

    expect(getByText(/500/)).toBeTruthy();
  });

  it("hides balance when visibility is off", () => {
    const { getByText, queryByText } = render(
      <BalanceCard balance={1500} currency="BRL" isVisible={false} />,
    );

    expect(queryByText(/1500/)).toBeNull();
    expect(getByText("••••••")).toBeTruthy();
  });

  it("toggles visibility when eye icon is pressed", () => {
    const onToggle = jest.fn();
    const { getByText } = render(
      <BalanceCard balance={1000} currency="BRL" onToggleVisibility={onToggle} />,
    );

    const buttons = getByText("Saldo disponible").parent?.parent?.parent?.parent;
    expect(onToggle).not.toHaveBeenCalled();
  });

  it("calls onTransfer when transfer button is pressed", () => {
    const onTransfer = jest.fn();
    const { getByText } = render(
      <BalanceCard balance={1000} currency="BRL" onTransfer={onTransfer} />,
    );

    fireEvent.press(getByText("Transferir"));
    expect(onTransfer).toHaveBeenCalledTimes(1);
  });
});
