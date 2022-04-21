import { BaseEntity } from 'src/common/entities/base.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class Profession extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column({ unique: true })
  public code: string;

  @Column()
  public abbreviation: string;

  @Column()
  public yearsCount: number;

  @Column({ nullable: true })
  public number: number;

  @Column('decimal')
  public fee: string;

  @OneToMany(() => Student, (student) => student.commissariat)
  public students: Array<Student>;

  @OneToMany(() => Subject, (subject) => subject.profession)
  public subjects: Array<Subject>;
}
