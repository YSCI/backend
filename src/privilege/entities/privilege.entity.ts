import { BaseEntity } from 'src/common/entities/base.entity';
import { Subprivilege } from 'src/subprivilege/entities/subprivilege.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Privilege extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @OneToMany(() => Subprivilege, (subprivilege) => subprivilege.privilege)
  public subprivileges: Subprivilege[];
}
