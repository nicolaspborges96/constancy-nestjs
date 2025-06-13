import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Entry } from './entities/entry.entity';
import { EntriesService } from './services/entries.service';
import { EntriesController } from './controllers/entries.controller';
import { EntriesRepository } from './repository/entries.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [EntriesController],
  providers: [EntriesService, EntriesRepository],
  exports: [EntriesService]
})
export class EntriesModule {}
