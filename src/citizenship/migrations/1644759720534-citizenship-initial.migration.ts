import { MigrationInterface, QueryRunner } from 'typeorm';

export class CitizenshipInitialMigration1644759720534
  implements MigrationInterface
{
  name = 'CitizenshipInitialMigration1644759720534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "citizenship" (
                "id" SERIAL NOT NULL,
                "country" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_14861bdc8463fecc684d3b55db8" PRIMARY KEY ("id")
                CONSTRAINT "UQ_dcd989387b401ac2bf475f3c052" UNIQUE ("country")

            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "citizenship"
        `);
  }
}
