import { BaseEntity } from 'src/common/entities/base.entity';
import { Region } from 'src/region/entities/region.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Community extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column()
  public regionId: number;

  @ManyToOne(() => Region, (region) => region.communities)
  public region: Region;

  @OneToMany(() => Student, (student) => student.registrationRegion)
  public registratedStudents: Array<Student>;

  @OneToMany(() => Student, (student) => student.residentRegion)
  public residentStudents: Array<Student>;
}
