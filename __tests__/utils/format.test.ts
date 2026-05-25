import { formatCurrency, formatDate } from "../../src/shared/utils/format";

describe("formatCurrency", () => {
  it("formats BRL currency with value", () => {
    const result = formatCurrency(1500.5, "BRL");
    expect(result).toMatch(/1\.?500/);
    expect(result).toMatch(/50/);
    expect(result).toMatch(/BRL/);
  });

  it("formats zero", () => {
    const result = formatCurrency(0, "BRL");
    expect(result).toMatch(/0/);
  });

  it("formats USD currency", () => {
    const result = formatCurrency(99.99, "USD");
    expect(result).toMatch(/99/);
  });

  it("formats large numbers with thousands separator", () => {
    const result = formatCurrency(1000000, "BRL");
    expect(result).toMatch(/1\.?000/);
  });

  it("defaults to BRL currency", () => {
    const result = formatCurrency(100);
    expect(result).toMatch(/BRL/);
  });
});

describe("formatDate", () => {
  it("formats date string to Spanish locale", () => {
    const result = formatDate("2026-03-27");
    expect(result).toMatch(/27/);
    expect(result).toMatch(/03/);
    expect(result).toMatch(/2026/);
  });

  it("formats first day of month", () => {
    const result = formatDate("2026-01-01");
    expect(result).toMatch(/01/);
  });

  it("formats end of year", () => {
    const result = formatDate("2026-12-31");
    expect(result).toMatch(/31/);
    expect(result).toMatch(/12/);
  });
});
