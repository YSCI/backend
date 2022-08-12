import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddChangeableColumnsColumntToCommandHistory1660065006271
  implements MigrationInterface
{
  name = 'AddChangeableColumnsColumntToCommandHistory1660065006271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD "changeableColumns" jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP COLUMN "changeableColumns"`,
    );
  }
}
