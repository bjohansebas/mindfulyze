import { PartialType } from '@nestjs/mapped-types'
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator'

export class CreateProfileDto {
  @IsString()
  @IsUrl()
  @IsOptional()
  @IsNotEmpty()
  readonly photo: string

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly firstName: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(3, 20)
  readonly lastName: string

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  readonly birth: string

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  readonly preferenceLang: string

  @IsString()
  @IsNotEmpty()
  @Length(4, 6)
  readonly gender: string
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
