import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsFreezedToStudent1653001065151 implements MigrationInterface {
  name = 'AddIsFreezedToStudent1653001065151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ADD "isFreezed" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "isFreezed"`);
  }
}
