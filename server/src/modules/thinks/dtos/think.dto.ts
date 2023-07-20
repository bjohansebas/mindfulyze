import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator'

export class CreateThinkDto {
	@IsString()
	@IsNotEmpty()
	@Length(5, 1000)
	readonly text: string
	@IsNotEmpty()
	@IsUUID()
	readonly place: string
	@IsOptional()
	@IsUUID('4', { each: true })
	emotions: string[]
}

export class UpdateThinkDto extends PartialType(CreateThinkDto) {}

export class UpdateEmotionsDto {
	@IsOptional()
	@IsUUID('4', { each: true })
	add: string[]
	@IsOptional()
	@IsUUID('4', { each: true })
	remove: string[]
}
