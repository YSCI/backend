import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOpenedAtColumn1651321033724 implements MigrationInterface {
  name = 'AddOpenedAtColumn1651321033724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" ADD "openedAt" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "openedAt"`);
  }
}
