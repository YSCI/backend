import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommunityInitialMigration1644774780381
  implements MigrationInterface
{
  name = 'CommunityInitialMigration1644774780381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "community" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "regionId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_27d779cba60f2b5d48debdd970a" UNIQUE ("name"),
                CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "community"
            ADD CONSTRAINT "FK_aa883bce577dd45d1d8215e8982" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "community" DROP CONSTRAINT "FK_aa883bce577dd45d1d8215e8982"
        `);
    await queryRunner.query(`
            DROP TABLE "community"
        `);
  }
}
