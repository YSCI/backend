import { BaseEntity } from 'src/common/entities/base.entity';
import { Status } from 'src/status/entities/status.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Command extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column()
  public changeableStatusId?: number;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'changeableStatusId' })
  public status?: Status;
}
