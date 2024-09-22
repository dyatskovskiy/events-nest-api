import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Participant } from '../participants/schemas/participant.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async getAll(page, limit): Promise<Event[]> {
    const offset = (page - 1) * limit;

    const events = await this.eventModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();

    return events;
  }

  async getOneById(id: mongoose.Schema.Types.ObjectId): Promise<EventDocument> {
    const event = await this.eventModel.findById(id).exec();

    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);

    return event;
  }

  async addParticipant(
    eventId: mongoose.Schema.Types.ObjectId,
    newParticipant: Participant,
  ): Promise<EventDocument> {
    const event = await this.getOneById(eventId);

    event.participants.push(newParticipant);

    return event.save();
  }

  async checkParticipantExists(
    eventId: mongoose.Schema.Types.ObjectId,
    email: string,
  ): Promise<Participant> {
    const event = await this.getOneById(eventId);

    const isExists = event.participants.find(
      (participant) => participant.email === email,
    );

    return isExists;
  }
}
