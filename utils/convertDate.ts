// utils/convertDate.ts

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`;
}

export const convertDateToString = (date: Date ): string => {
  return date.toISOString().split('T')[0] 
}

export const parseShortDate = (value: string): Date => {
  const parsedDate = new Date(value);
  return new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
};

export const parseDate = (value: string): Date  => {
  return new Date(value);
}