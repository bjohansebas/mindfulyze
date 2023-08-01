import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddMultiplyPlaces1690852295743 implements MigrationInterface {
  name = 'AddMultiplyPlaces1690852295743'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "places" DROP CONSTRAINT "fk_user_pl"`)
    await queryRunner.query(`ALTER TABLE "thinks" DROP CONSTRAINT "fk_place_tk"`)
    await queryRunner.query(
      `CREATE TABLE "think_places" ("think_id" uuid NOT NULL, "place_id" uuid NOT NULL, CONSTRAINT "PK_bfeba71b0b8622d9c3540dfcc86" PRIMARY KEY ("think_id", "place_id"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_d1d736cf5d448a64d982d755da" ON "think_places" ("think_id") `)
    await queryRunner.query(`CREATE INDEX "IDX_8835572ca7269279ed82f843ef" ON "think_places" ("place_id") `)
    await queryRunner.query(`ALTER TABLE "places" DROP COLUMN "user_id"`)
    await queryRunner.query(`ALTER TABLE "thinks" DROP COLUMN "place_id"`)
    await queryRunner.query(
      `ALTER TABLE "think_places" ADD CONSTRAINT "fk_think_tk" FOREIGN KEY ("think_id") REFERENCES "thinks"("think_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "think_places" ADD CONSTRAINT "fk_place_tk" FOREIGN KEY ("place_id") REFERENCES "places"("place_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "think_places" DROP CONSTRAINT "fk_place_tk"`)
    await queryRunner.query(`ALTER TABLE "think_places" DROP CONSTRAINT "fk_think_tk"`)
    await queryRunner.query(`ALTER TABLE "thinks" ADD "place_id" uuid NOT NULL`)
    await queryRunner.query(`ALTER TABLE "places" ADD "user_id" uuid NOT NULL`)
    await queryRunner.query(`DROP INDEX "public"."IDX_8835572ca7269279ed82f843ef"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_d1d736cf5d448a64d982d755da"`)
    await queryRunner.query(`DROP TABLE "think_places"`)
    await queryRunner.query(
      `ALTER TABLE "thinks" ADD CONSTRAINT "fk_place_tk" FOREIGN KEY ("place_id") REFERENCES "places"("place_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "places" ADD CONSTRAINT "fk_user_pl" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }
}
