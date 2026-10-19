export const formatAmountField = (number) => {
  if (!number) return "";
  return "Rp " + new Intl.NumberFormat("id-ID").format(number);
};

export const parseAmountField = (value) => {
  const digits = String(value).replace(/\D/g, "");
  return digits ? Number(digits) : 0;
};
