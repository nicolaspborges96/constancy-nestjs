import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Entry } from '../entities/entry.entity';
import { CreateEntryDto } from '../dto/create-entry.dto';
import { UpdateEntryDto } from '../dto/update-entry.dto';

@Injectable()
export class EntriesRepository {
  constructor(
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
  ) {}

  async findAll(): Promise<Entry[]> {
    return this.entriesRepository.find({
      relations: ['activity'],
    });
  }

  async findOne(id: string): Promise<Entry> {
    const entry = await this.entriesRepository.findOne({
      where: { id },
      relations: ['activity'],
    });

    if (!entry) {
      throw new NotFoundException(`Entry with ID "${id}" not found`);
    }

    return entry;
  }

  async findByActivityId(activityId: string): Promise<Entry[]> {
    return this.entriesRepository.find({
      where: { activityId },
      relations: ['activity'],
    });
  }

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const entry = this.entriesRepository.create(createEntryDto);
    return this.entriesRepository.save(entry);
  }

  async update(id: string, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    await this.entriesRepository.update(id, updateEntryDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.entriesRepository.delete(id);
  }
}
