import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { CreateThinkDto, UpdateEmotionsDto, UpdateThinkDto } from '../dtos/think.dto'

import { ThinksService } from '../services/thinks.service'

@Controller({ path: 'thinks', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class ThinkController {
	constructor(private thinkService: ThinksService) {}

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

	@Put(':id/emotions')
	newEmotions(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() payload: UpdateEmotionsDto,
	) {
		return this.thinkService.updateEmotion(id, payload)
	}
}
