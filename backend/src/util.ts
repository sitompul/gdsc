export function num(i: any): number {
  try {
    const res = Number(i);
    return isNaN(res) ? 0 : res;
  } catch {
    return 0;
  }
}

// Make sure that i is either null or undefined.
export function nil(i: any): boolean {
  return i == null;
}

// Make sure that "i" is either string, undefined or null.
export function nilStr(i: any): boolean {
  return typeof i === "string" || nil(i);
}
