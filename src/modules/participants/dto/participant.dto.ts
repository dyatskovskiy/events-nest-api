import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';

export enum DiscoveryMethod {
  Social = 'social',
  Friends = 'friends',
  Myself = 'myself',
}

export class ParticipantDto {
  @IsString({ message: 'Please enter the full name' })
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsEnum(DiscoveryMethod, {
    message: 'Please choose a valid discovery method',
  })
  @IsNotEmpty()
  discoveryMethod: DiscoveryMethod;
}
