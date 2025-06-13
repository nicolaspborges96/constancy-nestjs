import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../entities/activity.entity';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { UpdateActivityDto } from '../dto/update-activity.dto';

@Injectable()
export class ActivitiesRepository {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  async findAll(): Promise<Activity[]> {
    return this.activitiesRepository.find({
      relations: ['entries'],
    });
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({ 
      where: { id },
      relations: ['entries'],
    });
    
    if (!activity) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
    
    return activity;
  }

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = this.activitiesRepository.create(createActivityDto);
    return this.activitiesRepository.save(activity);
  }

  async update(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    await this.activitiesRepository.update(id, updateActivityDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}