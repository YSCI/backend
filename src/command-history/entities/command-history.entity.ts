import { Command } from 'src/command/entities/command.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class CommandHistory extends BaseEntity {
  @Column()
  public commandId: number;

  @ManyToOne(() => Command, { nullable: false, onDelete: 'CASCADE' })
  public command?: Command;

  @Column()
  public studentId: number;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  public student?: Student;

  @Column()
  public userId: number;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  public user?: User;

  @Column()
  public commandNumber: string;

  @Column({ default: false })
  public isAccepted: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  public affectDate: Date;

  @Column({ nullable: true })
  public description: string;

  @Column('jsonb', { nullable: true })
  public changeableColumns: UpdateStudentDto;
}
