import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class ProfessionsInitialMigration1644354593784
  implements MigrationInterface
{
  name = 'ProfessionsInitialMigration1644354593784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "profession" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "code" character varying NOT NULL,
                "abbreviation" character varying NOT NULL,
                "yearsCount" integer NOT NULL,
                "number" integer DEFAULT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_432ea09ad0b89696a0fbe9908a9" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.createUniqueConstraint(
      'profession',
      new TableUnique({ columnNames: ['code'] }),
    );

    await queryRunner.createUniqueConstraint(
      'profession',
      new TableUnique({ columnNames: ['abbreviation'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "profession"
        `);
  }
}
