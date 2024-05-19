// utils/formateDate.ts

export const formateDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяц нумеруется с нуля
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}