import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { ActivitiesRepository } from '../../activities/repository/activities.repository';
import { EntriesRepository } from '../../entries/repository/entries.repository';
import { FrequenciesRepository } from '../../frequencies/repository/frequencies.repository';
import { Entry } from '../../entries/entities/entry.entity';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const activitiesRepo = app.get(ActivitiesRepository);
  const entriesRepo = app.get(EntriesRepository);
  const frequenciesRepo = app.get(FrequenciesRepository);
  const dataSource = app.get(DataSource);

  console.log(' Limpando dados existentes...');
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query('TRUNCATE TABLE entries CASCADE');
    await queryRunner.query('TRUNCATE TABLE activities CASCADE');
    await queryRunner.query('TRUNCATE TABLE frequencies CASCADE');
    
    await queryRunner.commitTransaction();
    console.log(' Dados limpos com sucesso');
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error(' Erro ao limpar dados:', err);
    throw err;
  } finally {
    await queryRunner.release();
  }

  console.log(' Criando frequências...');
  const frequencies = await Promise.all([
    frequenciesRepo.create({
      name: 'Diária',
      unit: 'daily',
      times: 1
    }),
    frequenciesRepo.create({
      name: 'Semanal',
      unit: 'weekly', 
      times: 1
    }),
    frequenciesRepo.create({
      name: 'Mensal',
      unit: 'monthly',
      times: 1
    }),
    frequenciesRepo.create({
      name: 'Três vezes por semana',
      unit: 'weekly',
      times: 3
    })
  ]);

  console.log(' Criando atividades...');
  const activities = await Promise.all([
    activitiesRepo.create({
      name: 'Exercício Físico',
      weeklyFrequency: 5,
      ponderosity: 1.5
    }),
    activitiesRepo.create({
      name: 'Leitura',
      weeklyFrequency: 7,
      ponderosity: 1.0
    }),
    activitiesRepo.create({
      name: 'Meditação',
      weeklyFrequency: 7,
      ponderosity: 1.2
    }),
    activitiesRepo.create({
      name: 'Estudo de Programação',
      weeklyFrequency: 4,
      ponderosity: 2.0
    }),
    activitiesRepo.create({
      name: 'Praticar Idioma',
      weeklyFrequency: 3,
      ponderosity: 1.3
    })
  ]);

  console.log(' Criando registros de atividades...');
  const today = new Date();
  const entries: Entry[] = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    for (const activity of activities) {
      if (Math.random() > 0.3) {
        entries.push(
          await entriesRepo.create({
            activityId: activity.id,
            completionDate: date
          })
        );
      }
    }
  }

  console.log(' Seed concluído com sucesso!');
  console.log(` Dados criados:
  - ${frequencies.length} frequências
  - ${activities.length} atividades
  - ${entries.length} registros de atividades`);

  await app.close();
}

bootstrap()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(' Erro durante o seed:', error);
    process.exit(1);
  });