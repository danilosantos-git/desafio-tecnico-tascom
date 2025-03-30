import { Column, Model, Table, DataType } from 'sequelize-typescript';

export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

@Table
export class Task extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    defaultValue: TaskStatus.IN_PROGRESS,
  })
  status: TaskStatus;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  priority: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
}
