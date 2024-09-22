import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ParticipantDto } from './participant.dto';
import mongoose from 'mongoose';

export class AddParticipantDto {
  @IsNotEmpty()
  participant: ParticipantDto;

  @IsMongoId()
  @IsNotEmpty()
  eventId: mongoose.Schema.Types.ObjectId;
}
