import { PartialType } from '@nestjs/mapped-types';
import { IsHexColor, IsNotEmpty, Length } from 'class-validator';

export class CreateColorDto {
  @IsHexColor()
  @IsNotEmpty()
  @Length(6, 6)
  readonly code: string;
}

export class UpdateColorDto extends PartialType(CreateColorDto) {}
