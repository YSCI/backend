import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropChangeableStatusIdAddChangeableColumns1650232981126
  implements MigrationInterface
{
  name = 'DropChangeableStatusIdAddChangeableColumns1650232981126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command" DROP CONSTRAINT "FK_85cdf27e039687563a8bc4b2330"`,
    );
    await queryRunner.query(
      `ALTER TABLE "command" DROP COLUMN "changeableStatusId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "command" ADD "changeableColumns" jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command" DROP COLUMN "changeableColumns"`,
    );
    await queryRunner.query(
      `ALTER TABLE "command" ADD COLUMN "changeableStatusId" integer DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "command" ADD CONSTRAINT "FK_85cdf27e039687563a8bc4b2330" FOREIGN KEY ("changeableStatusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
