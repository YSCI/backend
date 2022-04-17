import { BaseEntity } from 'src/common/entities/base.entity';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';
import { Column, Entity } from 'typeorm';

@Entity()
export class Command extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column('jsonb', { nullable: true })
  public changeableColumns: UpdateStudentDto;
}
