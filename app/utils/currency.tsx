export const Currency = (value: number, suffix?: boolean) => {
  if (suffix === undefined) suffix = true;
  const formattedValue = new Intl.NumberFormat('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(Number(value));
  const valueWithSuffix = `${formattedValue}${suffix ? ' THB' : ''}`;
  return valueWithSuffix;
};
