import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Activity } from './entities/activity.entity';
import { ActivitiesService } from './services/activities.service';
import { ActivitiesRepository } from './repository/activities.repository';
import { ActivitiesController } from './controllers/activities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, ActivitiesRepository],
  exports: [ActivitiesService]
})
export class ActivitiesModule {}
