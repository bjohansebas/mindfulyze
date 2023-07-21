import { PartialType } from '@nestjs/mapped-types'
import { IsHexColor, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreatePlaceDto {
  @IsHexColor()
  @IsNotEmpty()
  @Length(6, 6)
  readonly code: string
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  readonly name: string
}

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}
