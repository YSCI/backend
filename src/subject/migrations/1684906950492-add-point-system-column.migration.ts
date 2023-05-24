import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPointSystemColumn1684906950492 implements MigrationInterface {
  name = 'AddPointSystemColumn1684906950492';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject" ADD "pointSystem" integer NOT NULL DEFAULT '10'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "pointSystem"`);
  }
}
