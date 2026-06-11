export function formatMoney(amount, currency = '') {
  const value = Number(amount) || 0

  return `${currency}${new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}`
}
