import { BaseEntity } from 'src/common/entities/base.entity';
import { Community } from 'src/community/entities/community.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Region extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @OneToMany(() => Community, (community) => community.region)
  public communities: Community[];

  @OneToMany(() => Student, (student) => student.registrationRegion)
  public registratedStudents: Array<Student>;

  @OneToMany(() => Student, (student) => student.residentRegion)
  public residentStudents: Array<Student>;
}
