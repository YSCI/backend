import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeDescriptionColumnNullable1651787374816
  implements MigrationInterface
{
  name = 'MakeDescriptionColumnNullable1651787374816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "commissariat" ALTER COLUMN "description" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "commissariat" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
