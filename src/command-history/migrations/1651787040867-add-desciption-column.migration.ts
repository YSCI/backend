import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDesciptionColumn1651787040867 implements MigrationInterface {
  name = 'AddDesciptionColumn1651787040867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP COLUMN "description"`,
    );
  }
}
