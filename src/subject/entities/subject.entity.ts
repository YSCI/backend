import { BaseEntity } from 'src/common/entities/base.entity';
import { Profession } from 'src/profession/entities/profession.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Subject extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column()
  public professionId: number;

  @ManyToOne(() => Profession, (profession) => profession.subjects)
  public profession: Profession;

  @Column('int', { array: true, nullable: true })
  public semesters: Array<number>;

  @Column('double precision', { nullable: true })
  public number: number;
}
