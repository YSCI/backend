import { MigrationInterface, QueryRunner } from 'typeorm';

export class CurriculumInitialMigration1650580937500
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "curriculum" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "groupId" integer NOT NULL, "subjectId" integer NOT NULL, "semesters" integer array NOT NULL, CONSTRAINT "PK_ea7cdfd52edbddc8d7352e2a747" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "curriculum" ADD CONSTRAINT "FK_17738259aaec52c716f9eaaa554" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "curriculum" ADD CONSTRAINT "FK_54b10306c3cee96dcdf499b94e5" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "curriculum" DROP CONSTRAINT "FK_54b10306c3cee96dcdf499b94e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "curriculum" DROP CONSTRAINT "FK_17738259aaec52c716f9eaaa554"`,
    );
    await queryRunner.query(`DROP TABLE "curriculum"`);
  }
}
