import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ParticipantDto {
  @IsString({ message: 'Please enter the full name' })
  @IsNotEmpty()
  fullName: string;

  @IsEmail({})
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  discoveryMethod: string;
}
