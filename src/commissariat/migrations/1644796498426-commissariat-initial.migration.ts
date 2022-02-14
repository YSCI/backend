import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommissariatInitialMigration1644796498426
  implements MigrationInterface
{
  name = 'CommissariatInitialMigration1644796498426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "commissariat" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "number" integer NOT NULL,
                "communityId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_d7908b7356eccad92cc5046e989" UNIQUE ("name"),
                CONSTRAINT "PK_dce3b629e46dfa56b40b62c1822" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "commissariat"
            ADD CONSTRAINT "FK_ccdbc31d7aed8cd8b141dfe3faf" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "commissariat" DROP CONSTRAINT "FK_ccdbc31d7aed8cd8b141dfe3faf"
        `);
    await queryRunner.query(`
            DROP TABLE "commissariat"
        `);
  }
}
