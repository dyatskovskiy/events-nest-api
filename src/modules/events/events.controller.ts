import { Controller, Get, Param } from '@nestjs/common';
import { Event } from './schemas/event.schema';
import { EventsService } from './events.service';
import { Participant } from '../participants/schemas/participant.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getAll(): Promise<Event[]> {
    const events = await this.eventsService.getAll();

    return events;
  }

  @Get('/:id/participants')
  async getAllParticipantsFromEvent(@Param('id') id): Promise<Participant[]> {
    const event = await this.eventsService.getOneById(id);

    return event.participants;
  }
}
