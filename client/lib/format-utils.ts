import currency from "currency.js";
import { format as dateFnsFormat } from "date-fns";

export const formatSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);

  if (hours === 0) return `${minutes} min`;

  return `${hours} h ${minutes}`;
};

export const formatDate = (date?: Date | null) =>
  date ? dateFnsFormat(date || new Date(), "dd/MM/yyyy") : undefined;

export const formatPrice = (price: number) =>
  currency(price, {
    separator: " ",
    decimal: ",",
    symbol: "€",
    precision: 0,
    pattern: `# !`,
  }).format();
