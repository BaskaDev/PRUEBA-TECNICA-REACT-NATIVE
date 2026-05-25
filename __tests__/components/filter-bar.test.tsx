import { render, fireEvent } from "@testing-library/react-native";
import { FilterBar } from "../../src/presentation/components/filter-bar";
import type { TransferFilters } from "../../src/domain/entities/transfer";

const EMPTY_FILTERS: TransferFilters = {
  name: "",
  minValue: "",
  maxValue: "",
  startDate: "",
  endDate: "",
};

function openFilters(getByText: ReturnType<typeof render>["getByText"]) {
  fireEvent.press(getByText("Filtros"));
}

describe("FilterBar", () => {
  it("renders search input always visible", () => {
    const { getByPlaceholderText } = render(
      <FilterBar
        filters={EMPTY_FILTERS}
        onChange={jest.fn()}
        onClear={jest.fn()}
      />,
    );

    expect(getByPlaceholderText("Buscar por nombre...")).toBeTruthy();
  });

  it("renders all filter inputs after opening", () => {
    const { getByPlaceholderText, getByText } = render(
      <FilterBar
        filters={EMPTY_FILTERS}
        onChange={jest.fn()}
        onClear={jest.fn()}
      />,
    );

    openFilters(getByText);

    expect(getByPlaceholderText("Mínimo")).toBeTruthy();
    expect(getByPlaceholderText("Máximo")).toBeTruthy();
  });

  it("calls onChange when typing in name filter", () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <FilterBar
        filters={EMPTY_FILTERS}
        onChange={onChange}
        onClear={jest.fn()}
      />,
    );

    fireEvent.changeText(getByPlaceholderText("Buscar por nombre..."), "John");
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: "John" }),
    );
  });

  it("does not show clear button when no filters active", () => {
    const onClear = jest.fn();
    const { queryByText } = render(
      <FilterBar
        filters={EMPTY_FILTERS}
        onChange={jest.fn()}
        onClear={onClear}
      />,
    );

    expect(queryByText("Limpiar")).toBeNull();
  });

  it("shows clear button and calls onClear when filters active", () => {
    const onClear = jest.fn();
    const { getByText } = render(
      <FilterBar
        filters={{ name: "John", minValue: "", maxValue: "", startDate: "", endDate: "" }}
        onChange={jest.fn()}
        onClear={onClear}
      />,
    );

    fireEvent.press(getByText("Limpiar"));
    expect(onClear).toHaveBeenCalled();
  });
});
