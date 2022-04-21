import { BaseEntity } from 'src/common/entities/base.entity';
import { Profession } from 'src/profession/entities/profession.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Curriculum } from '../../curriculum/entities/curriculum.entity';

@Entity()
export class Group extends BaseEntity {
  @Column({ unique: true })
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
}
