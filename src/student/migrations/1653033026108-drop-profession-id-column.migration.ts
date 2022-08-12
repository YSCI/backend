import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropProfessionIdColumn1653033026108 implements MigrationInterface {
  name = 'DropProfessionIdColumn1653033026108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_2185fec177595094ef7cf8e489e"`,
    );
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "professionId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ADD "professionId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_2185fec177595094ef7cf8e489e" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
