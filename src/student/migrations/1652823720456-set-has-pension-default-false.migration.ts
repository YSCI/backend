import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetHasPensionDefaultFalse1652823720456
  implements MigrationInterface
{
  name = 'SetHasPensionDefaultFalse1652823720456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "hasPension" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "hasPension" DROP DEFAULT`,
    );
  }
}
