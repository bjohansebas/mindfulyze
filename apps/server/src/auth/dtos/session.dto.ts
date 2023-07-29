import { IsJWT, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly idUser: string

  @IsString()
  @IsNotEmpty()
  @IsJWT()
  readonly token: string
}
