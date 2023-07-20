import { MigrationInterface, QueryRunner } from 'typeorm'

export class initEmotions1679875012228 implements MigrationInterface {
	name = 'initEmotions1679875012228'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "emotions" ("emotion_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name_emotion" character varying(20) NOT NULL, "type_emotion" character varying(8) NOT NULL DEFAULT 'Negative', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "color_id" uuid NOT NULL, CONSTRAINT "UQ_c79bd69c7d991b3e3683599da98" UNIQUE ("name_emotion"), CONSTRAINT "PK_484a87f966a2a2e0194ca89c3e0" PRIMARY KEY ("emotion_id"))`,
		)
		await queryRunner.query(
			`ALTER TABLE "emotions" ADD CONSTRAINT "fk_color_em" FOREIGN KEY ("color_id") REFERENCES "colors"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "emotions" DROP CONSTRAINT "fk_color_em"`)
		await queryRunner.query(`DROP TABLE "emotions"`)
	}
}
