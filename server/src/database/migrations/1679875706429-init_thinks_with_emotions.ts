import { MigrationInterface, QueryRunner } from 'typeorm'

export class initThinksWithEmotions1679875706429 implements MigrationInterface {
	name = 'initThinksWithEmotions1679875706429'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "think_emotions" ("think_emotion_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "think_id" uuid NOT NULL, "emotion_id" uuid NOT NULL, CONSTRAINT "PK_c189bca2e38971fc6ad055ae97a" PRIMARY KEY ("think_emotion_id"))`,
		)
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "thinks" ("think_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text_think" character varying NOT NULL, "is_archive" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "place_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_e67e4cd40412996c37587d48529" PRIMARY KEY ("think_id"))`,
		)
		await queryRunner.query(
			`ALTER TABLE "think_emotions" ADD CONSTRAINT "fk_think_thiemo" FOREIGN KEY ("think_id") REFERENCES "thinks"("think_id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
		await queryRunner.query(
			`ALTER TABLE "think_emotions" ADD CONSTRAINT "fk_emotion_thiemo" FOREIGN KEY ("emotion_id") REFERENCES "emotions"("emotion_id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
		await queryRunner.query(
			`ALTER TABLE "thinks" ADD CONSTRAINT "fk_place_tk" FOREIGN KEY ("place_id") REFERENCES "places"("place_id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
		await queryRunner.query(
			`ALTER TABLE "thinks" ADD CONSTRAINT "fk_user_tk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "thinks" DROP CONSTRAINT "fk_user_tk"`)
		await queryRunner.query(`ALTER TABLE "thinks" DROP CONSTRAINT "fk_place_tk"`)
		await queryRunner.query(`ALTER TABLE "think_emotions" DROP CONSTRAINT "fk_emotion_thiemo"`)
		await queryRunner.query(`ALTER TABLE "think_emotions" DROP CONSTRAINT "fk_think_thiemo"`)
		await queryRunner.query(`DROP TABLE "thinks"`)
		await queryRunner.query(`DROP TABLE "think_emotions"`)
	}
}
