import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ParticipantDocument = HydratedDocument<Participant>;

@Schema({ versionKey: false })
export class Participant {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  discoveryMethod: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
