import { BaseEntity } from 'src/common/entities/base.entity';
import { PointSystem } from 'src/common/enums/point-system.enum';
import { Profession } from 'src/profession/entities/profession.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

@Entity()
@Unique(['name', 'professionId'])
export class Subject extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public professionId: number;

  @ManyToOne(() => Profession, (profession) => profession.subjects)
  public profession: Profession;

  @Column('int', { array: true, nullable: true })
  public semesters: Array<number>;

  @Column('double precision', { nullable: true })
  public number: number;

  @Column('int', { default: PointSystem.Ten })
  public pointSystem: PointSystem;
}
