import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Participant,
  ParticipantSchema,
} from 'src/modules/participants/schemas/participant.schema';

export type EventDocument = HydratedDocument<Event>;

@Schema({ versionKey: false })
export class Event {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  eventDate: Date;

  @Prop()
  organizer: string;

  @Prop({
    type: [ParticipantSchema],
    default: [],
  })
  participants: Participant[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
