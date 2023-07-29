import { MigrationInterface, QueryRunner } from 'typeorm'

export class initPlace1679875421635 implements MigrationInterface {
  name = 'initPlace1679875421635'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "places" ("place_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name_place" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "color_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_6593cce8ac35db2bd3ca47803f6" PRIMARY KEY ("place_id"))`,
    )

    await queryRunner.query(
      `ALTER TABLE "places" ADD CONSTRAINT "fk_color_pl" FOREIGN KEY ("color_id") REFERENCES "colors"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "places" ADD CONSTRAINT "fk_user_pl" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "places" DROP CONSTRAINT "fk_user_pl"`)
    await queryRunner.query(`ALTER TABLE "places" DROP CONSTRAINT "fk_color_pl"`)

    await queryRunner.query(`DROP TABLE "places"`)
  }
}
