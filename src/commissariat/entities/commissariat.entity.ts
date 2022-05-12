import { BaseEntity } from 'src/common/entities/base.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Commissariat extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column()
  public number: number;

  @Column({ nullable: true })
  public description: string;

  @OneToMany(() => Student, (student) => student.commissariat)
  public students: Array<Student>;
}
