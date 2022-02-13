import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Citizenship extends BaseEntity {
  @Column({ unique: true })
  public country: string;
}
