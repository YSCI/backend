import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/common/entities/base.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public surname: string;

  @Column({ unique: true })
  public username: string;

  @Column({ select: false })
  public password: string;

  @Column({ nullable: true })
  public creatorId: number;

  @ManyToOne(() => User)
  public creator: User;

  @Column({ nullable: true })
  public updaterId: number;

  @ManyToOne(() => User)
  public updater: User;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
