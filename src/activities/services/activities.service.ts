import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { UpdateActivityDto } from '../dto/update-activity.dto';
import { ActivitiesRepository } from '../repository/activities.repository';
import { Activity } from '../entities/activity.entity';

@Injectable()
export class ActivitiesService {
  constructor(private readonly activitiesRepository: ActivitiesRepository) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activitiesRepository.create(createActivityDto);
  }

  async findAll(): Promise<Activity[]> {
    return this.activitiesRepository.findAll();
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne(id);
    if (!activity) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
    return activity;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne(id);
    if (!activity) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
    return this.activitiesRepository.update(id, updateActivityDto);
  }

  async remove(id: string): Promise<void> {
    const activity = await this.activitiesRepository.findOne(id);
    if (!activity) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
    await this.activitiesRepository.remove(id);
  }
}
