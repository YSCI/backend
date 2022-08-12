import { StudentRatesSum } from './student-rates-sum.type';

export class StudentRotationInfo {
  public id: number;
  public firstname: string;
  public lastname: string;
  public educationStatus: number;
  public rates: StudentRatesSum;
}
