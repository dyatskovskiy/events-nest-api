import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { EventsService } from './events.service';
import { Participant } from '../participants/schemas/participant.schema';
import { Response } from 'express';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 9,
    @Res() response: Response,
  ) {
    const total = await this.eventsService.getTotalCount();

    const events = await this.eventsService.getAll(page, limit);

    response.json({
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      events,
    });
  }

  @Get('/:id/participants')
  async getAllParticipantsFromEvent(@Param('id') id): Promise<Participant[]> {
    const event = await this.eventsService.getOneById(id);

    return event.participants;
  }
}
