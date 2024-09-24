import { Body, Controller, Post } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { AddParticipantDto } from './dto/add-participant.dto';
import { Participant } from './schemas/participant.schema';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  async addParticipant(
    @Body() addParticipantDto: AddParticipantDto,
  ): Promise<Participant> {
    const participant =
      await this.participantsService.addParticipant(addParticipantDto);

    return participant;
  }
}
