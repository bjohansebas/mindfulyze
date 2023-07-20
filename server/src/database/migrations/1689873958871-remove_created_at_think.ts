import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveCreatedAtThink1689873958871 implements MigrationInterface {
	name = 'RemoveCreatedAtThink1689873958871'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "think_emotions" DROP CONSTRAINT "fk_emotion_thiemo"
        `)
		await queryRunner.query(`
            ALTER TABLE "think_emotions" DROP CONSTRAINT "PK_c189bca2e38971fc6ad055ae97a"
        `)
		await queryRunner.query(`
            ALTER TABLE "think_emotions" DROP COLUMN "think_emotion_id"
        `)
		await queryRunner.query(`
            ALTER TABLE "think_emotions" DROP COLUMN "created_at"
        `)
		await queryRunner.query(`
            ALTER TABLE "think_emotions"
            ADD CONSTRAINT "PK_7545d28fa553899c5dc9b0dfd64" PRIMARY KEY ("think_id", "emotion_id")
        `)
		await queryRunner.query(`
            CREATE INDEX "IDX_50add2b7892687a7bbf64e7b99" ON "think_emotions" ("think_id")
        `)
		await queryRunner.query(`
            CREATE INDEX "IDX_91da22d86bdb29c77359348e0a" ON "think_emotions" ("emotion_id")
        `)
		await queryRunner.query(`
            ALTER TABLE "think_emotions"
            ADD CONSTRAINT "fk_emotion_thiemo" FOREIGN KEY ("emotion_id") REFERENCES "emotions"("emotion_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "think_emotions" DROP CONSTRAINT "fk_emotion_thiemo"
        `)
		await queryRunner.query(`
            DROP INDEX "public"."IDX_91da22d86bdb29c77359348e0a"
        `)
		await queryRunner.query(`
            DROP INDEX "public"."IDX_50add2b7892687a7bbf64e7b99"
        `)
		await queryRunner.query(`
            ALTER TABLE "think_emotions" DROP CONSTRAINT "PK_7545d28fa553899c5dc9b0dfd64"
        `)
		await queryRunner.query(`
            ALTER TABLE "think_emotions"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `)
		await queryRunner.query(`
            ALTER TABLE "think_emotions"
            ADD "think_emotion_id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `)
		await queryRunner.query(`
            ALTER TABLE "think_emotions"
            ADD CONSTRAINT "PK_c189bca2e38971fc6ad055ae97a" PRIMARY KEY ("think_emotion_id")
        `)
		await queryRunner.query(`
            ALTER TABLE "think_emotions"
            ADD CONSTRAINT "fk_emotion_thiemo" FOREIGN KEY ("emotion_id") REFERENCES "emotions"("emotion_id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
	}
}
