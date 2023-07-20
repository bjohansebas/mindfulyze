import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

import { ColorService } from '../services/color.service'

@Controller({ path: 'colors', version: '1' })
export class ColorController {
	constructor(private colorService: ColorService) {}

	@Get(':id')
	getColor(@Param('id', ParseUUIDPipe) id: string) {
		return this.colorService.findColorById(id)
	}

	@Get('code/:code')
	getColorByCode(@Param('code') code: string) {
		return this.colorService.findColorByCode(code)
	}
}
