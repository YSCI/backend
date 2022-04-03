import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Commissariat extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column()
  public number: number;

  @Column()
  public description: string;
}
