import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator'

export class CreateThinkDto {
	@IsString()
	@IsNotEmpty()
	@Length(5, 1000)
	readonly text: string
	@IsNotEmpty()
	@IsUUID()
	readonly place: string
}

export class UpdateThinkDto extends PartialType(CreateThinkDto) {}
