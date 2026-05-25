import { render } from "@testing-library/react-native";
import { TransferListItem } from "../../src/presentation/components/transfer-list-item";
import type { Transfer } from "../../src/domain/entities/transfer";

const mockTransfer: Transfer = {
  value: 250,
  date: "2026-03-20",
  currency: "BRL",
  payeer: {
    document: "98765432100",
    name: "John Doe",
  },
};

const largeTransfer: Transfer = {
  value: 1000000,
  date: "2026-12-25",
  currency: "BRL",
  payeer: {
    document: "12345678900",
    name: "Maria Santos Silva",
  },
};

describe("TransferListItem", () => {
  it("renders recipient name and formatted value", () => {
    const { getByText } = render(
      <TransferListItem transfer={mockTransfer} index={0} />,
    );

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText(/250/)).toBeTruthy();
  });

  it("renders completed status", () => {
    const { getByText } = render(
      <TransferListItem transfer={mockTransfer} index={0} />,
    );

    expect(getByText("Completada")).toBeTruthy();
  });

  it("renders formatted date", () => {
    const { getByText } = render(
      <TransferListItem transfer={mockTransfer} index={0} />,
    );

    expect(getByText(/03\/20\/2026|20\/03\/2026/)).toBeTruthy();
  });

  it("renders large values with thousands separator", () => {
    const { getByText } = render(
      <TransferListItem transfer={largeTransfer} index={1} />,
    );

    expect(getByText("Maria Santos Silva")).toBeTruthy();
  });
});
