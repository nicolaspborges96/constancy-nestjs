import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrequencyDto } from '../dto/create-frequency.dto';
import { UpdateFrequencyDto } from '../dto/update-frequency.dto';
import { FrequenciesRepository } from '../repository/frequencies.repository';
import { Frequency } from '../entities/frequency.entity';

@Injectable()
export class FrequenciesService {
  constructor(private readonly frequenciesRepository: FrequenciesRepository) {}

  async create(createFrequencyDto: CreateFrequencyDto): Promise<Frequency> {
    return this.frequenciesRepository.create(createFrequencyDto);
  }

  async findAll(): Promise<Frequency[]> {
    return this.frequenciesRepository.findAll();
  }

  async findOne(id: string): Promise<Frequency> {
    const frequency = await this.frequenciesRepository.findOne(id);
    if (!frequency) {
      throw new NotFoundException(`Frequency with ID "${id}" not found`);
    }
    return frequency;
  }

  async update(id: string, updateFrequencyDto: UpdateFrequencyDto): Promise<Frequency> {
    const frequency = await this.frequenciesRepository.findOne(id);
    if (!frequency) {
      throw new NotFoundException(`Frequency with ID "${id}" not found`);
    }
    return this.frequenciesRepository.update(id, updateFrequencyDto);
  }

  async remove(id: string): Promise<void> {
    const frequency = await this.frequenciesRepository.findOne(id);
    if (!frequency) {
      throw new NotFoundException(`Frequency with ID "${id}" not found`);
    }
    await this.frequenciesRepository.remove(id);
  }
}
