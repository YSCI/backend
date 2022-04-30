import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCurrentCourseAndGroupAddGroupId1651318245783
  implements MigrationInterface
{
  name = 'RemoveCurrentCourseAndGroupAddGroupId1651318245783';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP COLUMN "currentCourse"`,
    );
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "currentGroup"`);
    await queryRunner.query(
      `ALTER TABLE "student" ADD "groupId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_ce9660fc114efef4062bba4c119" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_ce9660fc114efef4062bba4c119"`,
    );
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "groupId"`);
    await queryRunner.query(
      `ALTER TABLE "student" ADD "currentGroup" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD "currentCourse" integer NOT NULL`,
    );
  }
}
