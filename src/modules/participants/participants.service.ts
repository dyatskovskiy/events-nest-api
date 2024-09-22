import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Participant } from './schemas/participant.schema';
import { Model } from 'mongoose';
import { AddParticipantDto } from './dto/add-participant.dto';
import { EventsService } from '../events/events.service';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant.name)
    private readonly participantModel: Model<Participant>,

    private readonly eventsService: EventsService,
  ) {}

  async addParticipant(addParticipantDto: AddParticipantDto) {
    const { participant, eventId } = addParticipantDto;

    const isParticipantExistsInEvent =
      await this.eventsService.checkParticipantExists(
        eventId,
        participant.email,
      );

    if (isParticipantExistsInEvent)
      throw new ConflictException(
        'This email has already been used to register for this event.',
      );

    const createdParticipant = await this.participantModel.create({
      ...participant,
    });

    await this.eventsService.addParticipant(eventId, createdParticipant);

    return createdParticipant;
  }
}
