export function formatCurrency(value: number, currency = "BRL"): string {
  return new Intl.NumberFormat("es", {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
