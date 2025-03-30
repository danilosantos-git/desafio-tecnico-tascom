import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'db.sqlite',
      models: [Task],
      autoLoadModels: true,
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
