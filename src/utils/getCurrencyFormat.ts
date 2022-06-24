export function getCurrencyFormat(value: number) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value / 100);
}

export const currencyMask = (value: string) => {
  let maskedPrice = value.replace(/\D/g, "");
  maskedPrice = `${(Number(maskedPrice) / 100).toFixed(2)}`;
  maskedPrice = maskedPrice.replace(".", ",");
  maskedPrice = maskedPrice.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  maskedPrice = maskedPrice.replace(/(\d)(\d{3}),/g, "$1.$2,");
  maskedPrice = `R$ ${maskedPrice}`;
  return maskedPrice;
};

export const currencyToValue = (value: string) => {
  return value
    .split("R$")[1]
    .replace(/\D/g, "")
    .replace(",", "")
    .replace(".", "");
};
