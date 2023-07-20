import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { Emotion } from 'modules/emotions/entities/emotion.entity'
import { Think } from '../entities/think.entity'
import { ThinkEmotion } from '../entities/thinkEmotion.entity'

import { AddEmotionsDto, DeleteEmotionsDto } from '../dtos/think-emotion.dto'

import { ThinksService } from './thinks.service'

@Injectable()
export class ThinksEmotionService {
	constructor(
		@InjectRepository(ThinkEmotion)
		private thinkEmotionRepo: Repository<ThinkEmotion>,
		@InjectRepository(Emotion) private emotionRepo: Repository<Emotion>,
		@Inject(forwardRef(() => ThinksService))
		private thinkService: ThinksService,
	) {}

	async registerEmotion(id_think: string, payload: AddEmotionsDto) {
		const think: Think = await this.thinkService.findById(id_think)

		const emotions: Emotion[] = await this.emotionRepo.findBy({
			id: In(payload.emotions),
		})

		for (const emotion of emotions) {
			const relationThink: ThinkEmotion = await this.thinkEmotionRepo.findOne({
				relations: ['think', 'emotion'],
				loadRelationIds: true,
				where: { think: { id: think.id }, emotion: { id: emotion.id } },
			})

			if (Object.keys(relationThink || {}).length === 0) {
				const newRelation: ThinkEmotion = this.thinkEmotionRepo.create({
					think: think,
					emotion: emotion,
				})

				await this.thinkEmotionRepo.save(newRelation)
			}
		}

		return this.thinkService.findById(id_think)
	}

	async deleteEmotion(id_think: string, payload: DeleteEmotionsDto) {
		const think: Think = await this.thinkService.findById(id_think)

		const emotions: Emotion[] = await this.emotionRepo.findBy({
			id: In(payload.emotions),
		})

		for (const emotion of emotions) {
			const relationsThink: ThinkEmotion[] = await this.thinkEmotionRepo.find({
				relations: ['think', 'emotion'],
				where: { think: { id: think.id } },
			})

			const findRelation: ThinkEmotion = relationsThink.find((value) => value.emotion.id === emotion.id)

			if (findRelation) {
				await this.thinkEmotionRepo.delete(findRelation.id)
			}
		}

		return this.thinkService.findById(id_think)
	}
}
