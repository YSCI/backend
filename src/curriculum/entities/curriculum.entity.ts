import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Group } from '../../group/entities/group.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class Curriculum extends BaseEntity {
  @Column()
  public groupId: number;

  @ManyToOne(() => Group, (group) => group.curriculum, { onDelete: 'CASCADE' })
  public group: Group;

  @Column()
  public subjectId: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  public subject: Subject;

  @Column('integer', { array: true })
  public semesters: Array<number>;
}
