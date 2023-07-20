import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AddEmotionsDto, DeleteEmotionsDto } from '../dtos/think-emotion.dto'
import { CreateThinkDto, UpdateThinkDto } from '../dtos/think.dto'

import { ThinksEmotionService } from '../services/thinks-emotion.service'
import { ThinksService } from '../services/thinks.service'

@Controller({ path: 'thinks', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class ThinkController {
	constructor(private thinkService: ThinksService, private thinkEmotionService: ThinksEmotionService) {}

	@Get(':id')
	getThink(@Param('id', ParseUUIDPipe) id: string) {
		return this.thinkService.findById(id)
	}

	@Post('')
	createThink(@Request() req, @Body() payload: CreateThinkDto) {
		return this.thinkService.create(req.user.sub, payload)
	}

	@Post(':id')
	deleteThink(@Param('id', ParseUUIDPipe) id: string) {
		return this.thinkService.remove(id)
	}

	@Put(':id')
	updateThink(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() payload: UpdateThinkDto,
	) {
		return this.thinkService.update(id, payload)
	}

	@Put(':id/emotions/add')
	newEmotions(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() payload: AddEmotionsDto,
	) {
		return this.thinkEmotionService.registerEmotion(id, payload)
	}

	@Put(':id/emotions/remove')
	removeEmotions(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() payload: DeleteEmotionsDto,
	) {
		return this.thinkEmotionService.deleteEmotion(id, payload)
	}
}
