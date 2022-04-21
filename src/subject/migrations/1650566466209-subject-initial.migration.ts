import { MigrationInterface, QueryRunner } from 'typeorm';

export class SubjectInitialMigration1650566466209
  implements MigrationInterface
{
  name = 'SubjectInitialMigration1650566466209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subject" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "professionId" integer NOT NULL, CONSTRAINT "UQ_d011c391e37d9a5e63e8b04c977" UNIQUE ("name"), CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" ADD CONSTRAINT "FK_8977f394e0b526cacc93ae2fc0e" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject" DROP CONSTRAINT "FK_8977f394e0b526cacc93ae2fc0e"`,
    );
    await queryRunner.query(`DROP TABLE "subject"`);
  }
}
