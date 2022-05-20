import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTriggerToStudentId1653037742011 implements MigrationInterface {
  name = 'AddTriggerToStudentId1653037742011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP CONSTRAINT "FK_e5b0320d28918e694cb56de5ea7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD CONSTRAINT "FK_e5b0320d28918e694cb56de5ea7" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP CONSTRAINT "FK_e5b0320d28918e694cb56de5ea7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD CONSTRAINT "FK_e5b0320d28918e694cb56de5ea7" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
