import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenderColumn1652422027052 implements MigrationInterface {
  name = 'AddGenderColumn1652422027052';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ADD "gender" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "gender"`);
  }
}
