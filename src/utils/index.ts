export const formatToRupiah = (number: number): string => {
  return `${number
    .toString()
    .replace(/\./g, "")
    .replace(/[^0-9]/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export * from "./constant";
