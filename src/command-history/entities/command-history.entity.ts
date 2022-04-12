import { Command } from 'src/command/entities/command.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class CommandHistory extends BaseEntity {
  @Column()
  public commandId: number;

  @ManyToOne(() => Command, { nullable: false })
  public command?: Command;

  @Column()
  public studentId: number;

  @ManyToOne(() => Student)
  public student?: Student;

  @Column()
  public userId: number;

  @ManyToOne(() => User, { nullable: false })
  public user?: User;

  @Column()
  public commandNumber: string;
}
