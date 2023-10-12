export const isDateValid = (string: string) =>
  !isNaN(new Date(string).getTime());
