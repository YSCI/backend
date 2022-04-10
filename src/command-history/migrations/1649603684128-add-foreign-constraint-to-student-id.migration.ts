import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddForeignConstraintToStudentId1649603684128
  implements MigrationInterface
{
  name = 'AddForeignConstraintToStudentId1649603684128';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD CONSTRAINT "FK_e5b0320d28918e694cb56de5ea7" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP CONSTRAINT "FK_e5b0320d28918e694cb56de5ea7"`,
    );
  }
}
