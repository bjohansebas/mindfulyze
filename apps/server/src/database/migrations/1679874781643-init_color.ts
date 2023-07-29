import { MigrationInterface, QueryRunner } from 'typeorm'

export class initColor1679874781643 implements MigrationInterface {
  name = 'initColor1679874781643'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS colors (
        color_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name_color VARCHAR(30) NOT NULL UNIQUE,
        code_color VARCHAR(6) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now()
      )`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "colors"`)
  }
}
