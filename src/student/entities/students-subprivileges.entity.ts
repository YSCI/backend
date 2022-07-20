import { Privilege } from 'src/privilege/entities/privilege.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity({ name: 'students_subprivileges' })
export class StudentsSubprivileges {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public studentId: number;

  @ManyToOne(() => Student)
  public student: Student;

  @Column()
  public privilegeId: number;

  @ManyToOne(() => Privilege)
  public privilege: Privilege;

  @Column({ nullable: true })
  public expirationDate: Date;
}
