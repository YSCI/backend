import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommandInitialMigration1645564053265
  implements MigrationInterface
{
  name = 'CommandInitialMigration1645564053265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "command" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "changeableStatusId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_949ab891561d1338e4e08235b9f" UNIQUE ("name"),
                CONSTRAINT "PK_5bfa4e1cb54b62f512078f3e7cb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "command"
            ADD CONSTRAINT "FK_85cdf27e039687563a8bc4b2330" FOREIGN KEY ("changeableStatusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "command" DROP CONSTRAINT "FK_85cdf27e039687563a8bc4b2330"
        `);
    await queryRunner.query(`
            DROP TABLE "command"
        `);
  }
}
