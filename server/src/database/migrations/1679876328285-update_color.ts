import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateColor1679876328285 implements MigrationInterface {
  name = 'updateColor1679876328285'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "colors" DROP CONSTRAINT "colors_name_color_key"`)
    await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "name_color"`)
    await queryRunner.query(`ALTER TABLE "colors" ADD "user_id" uuid`)
    await queryRunner.query(`ALTER TABLE "colors" DROP CONSTRAINT "colors_code_color_key"`)
    await queryRunner.query(
      `ALTER TABLE "colors" ADD CONSTRAINT "fk_user_co" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "colors" DROP CONSTRAINT "fk_user_co"`)
    await queryRunner.query(`ALTER TABLE "colors" ADD CONSTRAINT "colors_code_color_key" UNIQUE ("code_color")`)
    await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "user_id"`)
    await queryRunner.query(`ALTER TABLE "colors" ADD "name_color" character varying(30) NOT NULL`)
    await queryRunner.query(`ALTER TABLE "colors" ADD CONSTRAINT "colors_name_color_key" UNIQUE ("name_color")`)
  }
}
