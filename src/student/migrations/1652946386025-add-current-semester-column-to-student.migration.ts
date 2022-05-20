import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCurrentSemesterColumnToStudent1652946386025
  implements MigrationInterface
{
  name = 'AddCurrentSemesterColumnToStudent1652946386025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ADD "currentSemester" integer NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP COLUMN "currentSemester"`,
    );
  }
}
