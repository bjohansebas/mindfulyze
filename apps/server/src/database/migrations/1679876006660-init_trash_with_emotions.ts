import { MigrationInterface, QueryRunner } from 'typeorm'

export class initTrashWithEmotions1679876006660 implements MigrationInterface {
  name = 'initTrashWithEmotions1679876006660'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "think_trash_emotions" ("think_trash_emotion_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trash_th_id" uuid NOT NULL, "emotion_id" uuid NOT NULL, CONSTRAINT "PK_694cef030121cb7a7b4da6d176e" PRIMARY KEY ("think_trash_emotion_id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "trash_thinks" ("trash_th_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text_think" character varying NOT NULL, "date_start" date NOT NULL DEFAULT now(), "date_end" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "place_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_c9720ba6eeca8943db9a2734bb5" PRIMARY KEY ("trash_th_id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "think_trash_emotions" ADD CONSTRAINT "fk_think_trash_thiemo" FOREIGN KEY ("trash_th_id") REFERENCES "trash_thinks"("trash_th_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "think_trash_emotions" ADD CONSTRAINT "fk_emotion_thiemo_trash" FOREIGN KEY ("emotion_id") REFERENCES "emotions"("emotion_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "trash_thinks" ADD CONSTRAINT "fk_place_ts" FOREIGN KEY ("place_id") REFERENCES "places"("place_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "trash_thinks" ADD CONSTRAINT "fk_user_ts" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trash_thinks" DROP CONSTRAINT "fk_user_ts"`)
    await queryRunner.query(`ALTER TABLE "trash_thinks" DROP CONSTRAINT "fk_place_ts"`)
    await queryRunner.query(`ALTER TABLE "think_trash_emotions" DROP CONSTRAINT "fk_emotion_thiemo_trash"`)
    await queryRunner.query(`ALTER TABLE "think_trash_emotions" DROP CONSTRAINT "fk_think_trash_thiemo"`)
    await queryRunner.query(`DROP TABLE "trash_thinks"`)
    await queryRunner.query(`DROP TABLE "think_trash_emotions"`)
  }
}
