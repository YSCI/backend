import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class HealthStatus extends BaseEntity {
  @Column({ unique: true })
  public status: string;
}
