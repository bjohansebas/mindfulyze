import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  readonly password: string
}

export class UpdateEmailUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  readonly password: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  readonly newPassword: string
}
