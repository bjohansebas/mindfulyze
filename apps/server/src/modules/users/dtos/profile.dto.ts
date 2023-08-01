import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly name: string
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
