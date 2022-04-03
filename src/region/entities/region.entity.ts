import { BaseEntity } from 'src/common/entities/base.entity';
import { Community } from 'src/community/entities/community.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Region extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @OneToMany(() => Community, (community) => community.region)
  public communities: Community[];
}
