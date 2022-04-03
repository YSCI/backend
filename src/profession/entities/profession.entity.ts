import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Profession extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column({ unique: true })
  public code: string;

  @Column()
  public abbreviation: string;

  @Column()
  public yearsCount: number;

  @Column({ nullable: true })
  public number: number;

  @Column('decimal')
  public fee: string;
}
