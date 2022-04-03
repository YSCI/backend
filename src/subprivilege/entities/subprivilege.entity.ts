import { BaseEntity } from 'src/common/entities/base.entity';
import { Privilege } from 'src/privilege/entities/privilege.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Subprivilege extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column()
  public privilegeId: number;

  @ManyToOne(() => Privilege, (privilege) => privilege.subprivileges, {
    nullable: false,
  })
  public privilege: Privilege;
}
