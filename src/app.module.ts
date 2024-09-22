import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { EventsModule } from './modules/events/events.module';
import { ParticipantsModule } from './modules/participants/participants.module';

@Module({
  imports: [DatabaseModule, EventsModule, ParticipantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
