/**
 * Formats a number as Singapore Dollar currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-SG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
