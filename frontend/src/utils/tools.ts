/**
 * Force anything to number.
 */ 
export function num(i: any): number {
  try {
    const n = Number(i);
    return isNaN(n) ? 0 : n;
  } catch {
    return 0;
  }
}

// Check if "i" is either null or undefined.
export function nil(i: any): boolean {
  return i == null;
}

// Check if "i" is either null | undefined | string
export function nilStr(i: any): boolean {
  return typeof i === "string" || nil(i);
}

// Check if "i" is either null | undefined | number
export function nilNum(i: any): boolean {
  return typeof i === "number" || nil(i);
}

/**
 * Get user locale language and current timezone.
 */ 
export function getLocaleTZ(): [locale: string, tz: string] {
  const l = navigator.language || "id-ID";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Jakarta";
  return [l, tz];
}

/**
 * Check if "i" is date.
 */
export function isDate(i: any): boolean {
  const d = new Date(i);
  return !isNaN(d.getTime()) && d.toString() !== "Invalid Date";
}

/**
 * Return empty string if invalid date is given.
 */
export function dateString(i: any): string {
  if (!isDate(i)) return "";

  const d = new Date(i);
  const [locale, timeZone] = getLocaleTZ();
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h24",
    timeZone,
  }).format(d);
}

/**
 * Convert date into datetime-local value.
 * @param date Input date that wants to be converted
 * @returns String format for <input type="datetime-local"/>
 */
export function toDateTimeLocal(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const datetimeLocalString = `${year}-${month}-${day}T${hours}:${minutes}`;
  return datetimeLocalString;
}
