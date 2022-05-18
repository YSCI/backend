import { BaseEntity } from 'src/common/entities/base.entity';
import { Profession } from 'src/profession/entities/profession.entity';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Curriculum } from '../../curriculum/entities/curriculum.entity';

@Entity()
@Unique(['number', 'openedAt'])
export class Group extends BaseEntity {
  @Column()
  public number: string;

  @Column()
  public currentSemester: number;

  @Column({ nullable: true })
  public auditorium: string;

  @Column()
  public professionId: number;

  @ManyToOne(() => Profession)
  public profession: Profession;

  @OneToMany(() => Curriculum, (curriculum) => curriculum.group)
  public curriculum: Array<Curriculum>;

  @Column()
  public openedAt: number;
}
