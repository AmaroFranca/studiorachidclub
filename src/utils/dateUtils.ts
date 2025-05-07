
/**
 * Returns the Portuguese name of a given month.
 * @param month - The month index (0-11)
 * @returns The Portuguese name of the month
 */
export function getMonthName(month: number): string {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return months[month];
}

/**
 * Returns a formatted date string in Portuguese format (DD de Month de YYYY).
 * @returns Formatted date string
 */
export function getFormattedDate(): string {
  const currentDate = new Date();
  return `${currentDate.getDate()} de ${getMonthName(currentDate.getMonth())} de ${currentDate.getFullYear()}`;
}
