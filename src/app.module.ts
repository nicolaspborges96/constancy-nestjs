import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivitiesModule } from './activities/activities.module';
import { FrequenciesModule } from './frequencies/frequencies.module';
import { EntriesModule } from './entries/entries.module';

@Module({
  imports: [ActivitiesModule, FrequenciesModule, EntriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
