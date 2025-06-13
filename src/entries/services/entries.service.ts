import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntryDto } from '../dto/create-entry.dto';
import { UpdateEntryDto } from '../dto/update-entry.dto';
import { EntriesRepository } from '../repository/entries.repository';
import { Entry } from '../entities/entry.entity';

@Injectable()
export class EntriesService {
  constructor(private readonly entriesRepository: EntriesRepository) {}

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    return this.entriesRepository.create(createEntryDto);
  }

  async findAll(): Promise<Entry[]> {
    return this.entriesRepository.findAll();
  }

  async findOne(id: string): Promise<Entry> {
    const entry = await this.entriesRepository.findOne(id);
    if (!entry) {
      throw new NotFoundException(`Entry with ID "${id}" not found`);
    }
    return entry;
  }

  async findByActivityId(activityId: string): Promise<Entry[]> {
    const entries = await this.entriesRepository.findByActivityId(activityId);
    return entries;
  }

  async update(id: string, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    const entry = await this.entriesRepository.findOne(id);
    if (!entry) {
      throw new NotFoundException(`Entry with ID "${id}" not found`);
    }
    return this.entriesRepository.update(id, updateEntryDto);
  }

  async remove(id: string): Promise<void> {
    const entry = await this.entriesRepository.findOne(id);
    if (!entry) {
      throw new NotFoundException(`Entry with ID "${id}" not found`);
    }
    await this.entriesRepository.remove(id);
  }
}
