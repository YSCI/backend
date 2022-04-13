import { MigrationInterface, QueryRunner } from 'typeorm';

export class IdentificationDataUniqueIndexes1649283418604
  implements MigrationInterface
{
  name = 'IdentificationDataUniqueIndexes1649283418604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "UQ_6da9fd0b73506ece3f38846eec2" UNIQUE ("passportSeries")
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "UQ_67d28a44f056c104df1f2dc1b4a" UNIQUE ("socialCardNumber")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "UQ_67d28a44f056c104df1f2dc1b4a"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "UQ_6da9fd0b73506ece3f38846eec2"
        `);
  }
}
