import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Frequency } from '../entities/frequency.entity';
import { CreateFrequencyDto } from '../dto/create-frequency.dto';
import { UpdateFrequencyDto } from '../dto/update-frequency.dto';

@Injectable()
export class FrequenciesRepository {
  constructor(
    @InjectRepository(Frequency)
    private frequenciesRepository: Repository<Frequency>,
  ) {}

  async findAll(): Promise<Frequency[]> {
    return this.frequenciesRepository.find();
  }

  async findOne(id: string): Promise<Frequency> {
    const frequency = await this.frequenciesRepository.findOne({
      where: { id },
    });

    if (!frequency) {
      throw new NotFoundException(`Frequency with ID "${id}" not found`);
    }

    return frequency;
  }

  async create(createFrequencyDto: CreateFrequencyDto): Promise<Frequency> {
    const frequency = this.frequenciesRepository.create(createFrequencyDto);
    return this.frequenciesRepository.save(frequency);
  }

  async update(id: string, updateFrequencyDto: UpdateFrequencyDto): Promise<Frequency> {
    await this.frequenciesRepository.update(id, updateFrequencyDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.frequenciesRepository.delete(id);
  }
}
