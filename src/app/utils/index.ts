// Utils
import { format, startOfToday, endOfToday, parse } from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd\'T\'HH:mm:ss';
const DATE_FORMAT_TZ = 'yyyy-MM-dd\'T\'HH:mm:ssXXX';

export function isEmpty(obj: any): boolean {
  for (const key in obj) {
    // tslint:disable-next-line:curly
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export function getCurrentMonthStartEndDates(): any {
  const date = new Date();
  const startDate = format(new Date(date.getFullYear(), date.getMonth(), 1), DATE_FORMAT);
  const endDate = format(new Date(date.getFullYear(), date.getMonth() + 1, 0), DATE_FORMAT);
  return { startDate, endDate };
}

export function getTodaysDate(current = false): any {
  return {
    startDate: current ? format(new Date(), DATE_FORMAT) : format(startOfToday(), DATE_FORMAT),
    endDate: format(endOfToday(), DATE_FORMAT)
  };
}

export function parseDate(date: string): any {
  return parse(date, DATE_FORMAT_TZ, new Date());
}

export function secondsToHms(secs): string {
  secs = Number(secs);
  const h = Math.floor(secs / 3600);
  const m = Math.floor(secs % 3600 / 60);
  const s = Math.floor(secs % 3600 % 60);

  const hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
}

export function strTitleCase(str: string): string {
  return str.toLowerCase().split(' ').map((word) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}
