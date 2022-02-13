import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Nationality extends BaseEntity {
  @Column({ unique: true })
  public name: string;
}
