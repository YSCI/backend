import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSemestersColumn1651261186934 implements MigrationInterface {
  name = 'AddSemestersColumn1651261186934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject" ADD "semesters" integer array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "semesters"`);
  }
}
