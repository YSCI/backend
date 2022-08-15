import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddChangeableColumnsOldValuesColumn1660573051447
  implements MigrationInterface
{
  name = 'AddChangeableColumnsOldValuesColumn1660573051447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD "changeableColumnsOldValues" jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP COLUMN "changeableColumnsOldValues"`,
    );
  }
}
