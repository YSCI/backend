import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupInitialMigration1650580876095 implements MigrationInterface {
  name = 'GroupInitialMigration1650580876095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "number" character varying NOT NULL, "currentSemester" integer NOT NULL, "auditorium" character varying, "professionId" integer NOT NULL, CONSTRAINT "UQ_9e63be925b94d8adaec82959bc3" UNIQUE ("number"), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD CONSTRAINT "FK_144af9344f90f1ab4c2bd0aedaa" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" DROP CONSTRAINT "FK_144af9344f90f1ab4c2bd0aedaa"`,
    );
    await queryRunner.query(`DROP TABLE "group"`);
  }
}
