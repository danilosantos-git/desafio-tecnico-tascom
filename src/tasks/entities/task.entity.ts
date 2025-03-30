import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Task extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isCompleted: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
}
