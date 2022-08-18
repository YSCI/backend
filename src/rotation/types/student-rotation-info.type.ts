import { StudentRatesSum } from './student-rates-sum.type';

export interface StudentRotationInfo {
  id: number;
  firstname: string;
  lastname: string;
  educationStatus: number;
  ratesSum: StudentRatesSum;
}
