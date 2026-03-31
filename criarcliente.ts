// src/clients/dto/create-client.dto.ts
import { IsString, IsEmail, Length, Matches } from 'class-validator';

export class CreateClientDto {
  @IsString() name: string;

  @Matches(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos' })
  cpf: string;

  @IsEmail() email: string;

  @IsString()
  @Length(8, 20)
  password: string;
}
