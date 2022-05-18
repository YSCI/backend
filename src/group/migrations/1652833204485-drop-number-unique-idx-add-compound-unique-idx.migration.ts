import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropNumberUniqueIdxAddCompoundUniqueIdx1652833204485
  implements MigrationInterface
{
  name = 'DropNumberUniqueIdxAddCompoundUniqueIdx1652833204485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" DROP CONSTRAINT "UQ_9e63be925b94d8adaec82959bc3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD CONSTRAINT "UQ_e78b706871b5d106969fc635e16" UNIQUE ("number", "openedAt")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" DROP CONSTRAINT "UQ_e78b706871b5d106969fc635e16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD CONSTRAINT "UQ_9e63be925b94d8adaec82959bc3" UNIQUE ("number")`,
    );
  }
}
