import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DiscoveryMethod } from '../dto/participant.dto';

export type ParticipantDocument = HydratedDocument<Participant>;

@Schema({ versionKey: false })
export class Participant {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ type: Date })
  dateOfBirth: Date;

  @Prop({ enum: DiscoveryMethod })
  discoveryMethod: DiscoveryMethod;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
