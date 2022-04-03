import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentsSubprivilegesTable1649022644651
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "students_privileges"`);

    await queryRunner.query(`
        CREATE TABLE "students_subprivileges" (
            "studentId" integer NOT NULL,
            "subprivilegeId" integer NOT NULL,
            CONSTRAINT "PK_e35a620cd34039fa50646b4e940" PRIMARY KEY ("studentId", "subprivilegeId")
        )`);

    await queryRunner.query(`
        CREATE INDEX "IDX_0ea11de9e45a7b66ef3ad60ae9" ON "students_subprivileges" ("studentId")`);

    await queryRunner.query(`
        CREATE INDEX "IDX_4f69cf3ecd722d6f3becbaf319" ON "students_subprivileges" ("subprivilegeId")`);

    await queryRunner.query(`
            ALTER TABLE "students_subprivileges"
            ADD CONSTRAINT "FK_0ea11de9e45a7b66ef3ad60ae96" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "students_subprivileges"
            ADD CONSTRAINT "FK_4f69cf3ecd722d6f3becbaf3194" FOREIGN KEY ("subprivilegeId") REFERENCES "subprivilege"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "students_subprivileges" DROP CONSTRAINT "FK_4f69cf3ecd722d6f3becbaf3194"`);

    await queryRunner.query(`
        ALTER TABLE "students_subprivileges" DROP CONSTRAINT "FK_0ea11de9e45a7b66ef3ad60ae96"`);

    await queryRunner.query(`
        DROP INDEX "public"."IDX_4f69cf3ecd722d6f3becbaf319"`);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_0ea11de9e45a7b66ef3ad60ae9"`);
    await queryRunner.query(`
        DROP TABLE "students_subprivileges"`);
  }
}
