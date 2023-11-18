export type DateInt = number;

export function isDateInt(i: number): i is DateInt {
  const date = new Date(i);
  return !isNaN(date.getTime()) && date.toString() !== "Invalid Date";
}

export type Todo = {
  id: number;
  description: string;
  done: number;
  deadline: DateInt;
}
