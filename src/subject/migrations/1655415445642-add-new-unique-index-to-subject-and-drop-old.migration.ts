import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewUniqueIndexToSubjectAndDropOld1655415445642
  implements MigrationInterface
{
  name = 'AddNewUniqueIndexToSubjectAndDropOld1655415445642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject" DROP CONSTRAINT "UQ_d011c391e37d9a5e63e8b04c977"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" ADD CONSTRAINT "UQ_0646e14e4d88afe4a5a037e8d71" UNIQUE ("name", "professionId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject" DROP CONSTRAINT "UQ_0646e14e4d88afe4a5a037e8d71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" ADD CONSTRAINT "UQ_d011c391e37d9a5e63e8b04c977" UNIQUE ("name")`,
    );
  }
}
