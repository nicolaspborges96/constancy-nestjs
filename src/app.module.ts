import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { Entry } from './entries/entities/entry.entity';
import { EntriesModule } from './entries/entries.module';
import { Activity } from './activities/entities/activity.entity';
import { ActivitiesModule } from './activities/activities.module';
import { Frequency } from './frequencies/entities/frequency.entity';
import { FrequenciesModule } from './frequencies/frequencies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'constancy',
      entities: [Activity, Entry, Frequency],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    ActivitiesModule, 
    FrequenciesModule, 
    EntriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
