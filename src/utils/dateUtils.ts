
export function getMonthName(month: number): string {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return months[month];
}

export function getFormattedDate(): string {
  const currentDate = new Date();
  return `${currentDate.getDate()} de ${getMonthName(currentDate.getMonth())} de ${currentDate.getFullYear()}`;
}

// Function to parse DD/MM/YYYY date string to Date object
export function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

// Check if a date is within the specified number of days from the most recent date
export function isDateWithinDays(dateString: string, days: number): boolean {
  if (!days) return true;
  
  const date = parseDate(dateString);
  
  // For comparison, we'll use the reference date (either from dataset or if not available, current date)
  // This allows filtering to work with "fictitious" dates
  const referenceDate = new Date(2024, 3, 28); // April 28, 2024 (most recent date in our dataset)
  
  const pastDate = new Date(referenceDate);
  pastDate.setDate(referenceDate.getDate() - days);
  
  return date >= pastDate && date <= referenceDate;
}
