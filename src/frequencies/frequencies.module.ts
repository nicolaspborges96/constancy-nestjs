import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrequenciesService } from './services/frequencies.service';
import { FrequenciesController } from './controllers/frequencies.controller';
import { Frequency } from './entities/frequency.entity';
import { FrequenciesRepository } from './repository/frequencies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Frequency])],
  controllers: [FrequenciesController],
  providers: [FrequenciesService, FrequenciesRepository],
  exports: [FrequenciesService]
})
export class FrequenciesModule {}
