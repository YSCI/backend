import { Citizenship } from 'src/citizenship/entities/citizenship.entity';
import { Commissariat } from 'src/commissariat/entities/commissariat.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { HealthStatus } from 'src/health-status/entities/health-status.entity';
import { Nationality } from 'src/nationality/entities/nationality.entity';
import { Profession } from 'src/profession/entities/profession.entity';
import { Status } from 'src/status/entities/status.entity';
import { Subprivilege } from 'src/subprivilege/entities/subprivilege.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column()
  public fathername: string;

  @Column('timestamp with time zone')
  public dateOfBirth: Date;

  @Column()
  public registrationAddress: string;

  @Column()
  public residentAddress: string;

  @Column('varchar', { array: true })
  public contactNumbers: Array<string>;

  @Column()
  public citizenshipId?: number;

  @ManyToOne(() => Citizenship)
  public citizenship: Citizenship;

  @Column()
  public nationalityId?: number;

  @ManyToOne(() => Nationality)
  public nationality: Nationality;

  @Column()
  public professionId?: number;

  @ManyToOne(() => Profession)
  public profession: Profession;

  @Column()
  public healthStatusId?: number;

  @ManyToOne(() => HealthStatus)
  public healthStatus: HealthStatus;

  @Column()
  public statusId?: number;

  @ManyToOne(() => Status)
  public status: Status;

  @Column()
  public commissariatId?: number;

  @ManyToOne(() => Commissariat)
  public commissariat: Commissariat;

  @ManyToMany(() => Subprivilege)
  @JoinTable({ name: 'students_subprivileges' })
  public subprivileges: Array<Subprivilege>;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  public dateOfAcceptance: Date;

  @Column()
  public acceptanceCommandNumber: string;

  @Column()
  public currentCourse: number;

  @Column()
  public currentGroup: string;
}
