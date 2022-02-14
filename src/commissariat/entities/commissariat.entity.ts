import { BaseEntity } from 'src/common/entities/base.entity';
import { Community } from 'src/community/entities/community.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Commissariat extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column()
  public number: number;

  @Column()
  public communityId: number;

  @ManyToOne(() => Community)
  public community: Community;
}
