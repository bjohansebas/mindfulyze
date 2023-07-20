import { IsNotEmpty, IsUUID } from 'class-validator'

export class AddEmotionsDto {
	@IsNotEmpty()
	@IsUUID('4', { each: true })
	emotions: string[]
}

export class DeleteEmotionsDto {
	@IsNotEmpty()
	@IsUUID('4', { each: true })
	emotions: string[]
}
