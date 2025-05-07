
export function getMonthName(month: number): string {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return months[month];
}

export function formatDate(date: Date): string {
  return `${date.getDate()} de ${getMonthName(date.getMonth())} de ${date.getFullYear()}`;
}
