const SEPTEMBER = 9;

export class DateHelpers {
  static getCurrentAcademicYear(): [number, number] {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    return currentMonth >= SEPTEMBER
      ? [currentYear, currentYear + 1]
      : [currentYear - 1, currentYear];
  }
}
