import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUniqueCompoundIndexOnGroupAndSubjectIds1651606106809
  implements MigrationInterface
{
  name = 'CreateUniqueCompoundIndexOnGroupAndSubjectIds1651606106809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "curriculum" ADD CONSTRAINT "UQ_c1915773f6a3d5d49776b29d39d" UNIQUE ("groupId", "subjectId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "curriculum" DROP CONSTRAINT "UQ_c1915773f6a3d5d49776b29d39d"`,
    );
  }
}
