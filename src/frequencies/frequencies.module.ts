import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Frequency } from './entities/frequency.entity';
import { FrequenciesService } from './services/frequencies.service';
import { FrequenciesRepository } from './repository/frequencies.repository';
import { FrequenciesController } from './controllers/frequencies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Frequency])],
  controllers: [FrequenciesController],
  providers: [FrequenciesService, FrequenciesRepository],
  exports: [FrequenciesService]
})
export class FrequenciesModule {}
