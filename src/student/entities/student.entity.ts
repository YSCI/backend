import { Citizenship } from 'src/citizenship/entities/citizenship.entity';
import { CommandHistory } from 'src/command-history/entities/command-history.entity';
import { Commissariat } from 'src/commissariat/entities/commissariat.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { EducationBasis } from 'src/common/enums/education-basis.enum';
import { EducationStatus } from 'src/common/enums/education-status.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { PassportType } from 'src/common/enums/passport-type.enum';
import { Community } from 'src/community/entities/community.entity';
import { Group } from 'src/group/entities/group.entity';
import { HealthStatus } from 'src/health-status/entities/health-status.entity';
import { Nationality } from 'src/nationality/entities/nationality.entity';
import { Privilege } from 'src/privilege/entities/privilege.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Region } from 'src/region/entities/region.entity';
import { Status } from 'src/status/entities/status.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column()
  public fathername: string;

  @Column('int')
  public gender: Gender;

  @Column({ default: false })
  public hasPension: boolean;

  @Column('timestamp with time zone')
  public dateOfBirth: Date;

  @Column({ nullable: true })
  public registrationRegionId: number;

  @ManyToOne(() => Region, (region) => region.registratedStudents)
  public registrationRegion: Region;

  @Column({ nullable: true })
  public registrationCommunityId: number;

  @ManyToOne(() => Community, (community) => community.registratedStudents)
  public registrationCommunity: Community;

  @Column({ nullable: true })
  public residentRegionId: number;

  @ManyToOne(() => Region, (region) => region.residentStudents)
  public residentRegion: Region;

  @Column({ nullable: true })
  public residentCommunityId: number;

  @ManyToOne(() => Community, (community) => community.residentStudents)
  public residentCommunity: Community;

  @Column()
  public registrationAddress: string;

  @Column()
  public residentAddress: string;

  @Column({ unique: true })
  public passportSeries: string;

  @Column({ nullable: true })
  public passportDateOfIssue: Date;

  @Column({ nullable: true })
  public passportValidUntil: Date;

  @Column({ nullable: true })
  public passportIssuedBy: string;

  @Column({ nullable: true })
  public passportType: PassportType;

  @Column({ unique: true })
  public socialCardNumber: number;

  @Column('varchar', { array: true })
  public contactNumbers: Array<string>;

  @Column()
  public educationBasis: EducationBasis;

  @Column()
  public citizenshipId?: number;

  @ManyToOne(() => Citizenship)
  public citizenship: Citizenship;

  @Column()
  public nationalityId?: number;

  @ManyToOne(() => Nationality)
  public nationality: Nationality;

  @Column()
  public healthStatusId?: number;

  @ManyToOne(() => HealthStatus)
  public healthStatus: HealthStatus;

  @Column()
  public statusId?: number;

  @ManyToOne(() => Status)
  public status: Status;

  @Column('int')
  public educationStatus: EducationStatus;

  @Column({ nullable: true })
  public commissariatId?: number;

  @ManyToOne(() => Commissariat, (commissariat) => commissariat.students)
  public commissariat: Commissariat;

  @Column({ nullable: true })
  public privilegeId: number;

  @ManyToOne(() => Privilege)
  public privilege: Privilege;

  @Column({ nullable: true })
  public privilegeExpirationDate: Date;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  public dateOfAcceptance: Date;

  @Column()
  public acceptanceCommandNumber: string;

  @OneToMany(() => CommandHistory, (command) => command.student)
  public attachedCommands: Array<CommandHistory>;

  @Column()
  public groupId: number;

  @ManyToOne(() => Group)
  public group: Group;

  @Column({ default: 1 })
  public currentSemester: number;

  @Column({ default: false })
  public isFreezed: boolean;

  @OneToMany(() => Rating, (rating) => rating.student)
  public rates: Array<Rating>;
}
