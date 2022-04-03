import { BaseEntity } from 'src/common/entities/base.entity';
import { Region } from 'src/region/entities/region.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Community extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @Column()
  public regionId: number;

  @ManyToOne(() => Region, (region) => region.communities)
  public region: Region;
}
