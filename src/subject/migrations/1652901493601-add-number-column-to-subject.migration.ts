import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNumberColumnToSubject1652901493601
  implements MigrationInterface
{
  name = 'AddNumberColumnToSubject1652901493601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject" ADD "number" double precision`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "number"`);
  }
}
