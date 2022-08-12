import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsAcceptedColumn1658320284557 implements MigrationInterface {
  name = 'AddIsAcceptedColumn1658320284557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD "isAccepted" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP COLUMN "isAccepted"`,
    );
  }
}
