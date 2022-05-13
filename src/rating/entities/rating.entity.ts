import { BaseEntity } from 'src/common/entities/base.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, Index, ManyToOne, Unique } from 'typeorm';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
@Unique(['studentId', 'subjectId', 'semester'])
export class Rating extends BaseEntity {
  @Column()
  @Index()
  public studentId: number;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  public student: Student;

  @Column()
  @Index()
  public subjectId: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  public subject: Subject;

  @Column()
  @Index()
  public semester: number;

  @Column()
  @Index()
  public rate: number;
}
