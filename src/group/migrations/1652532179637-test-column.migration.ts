import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestColumn1652532179637 implements MigrationInterface {
  name = 'TestColumn1652532179637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "group" ADD "test" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "test"`);
  }
}
