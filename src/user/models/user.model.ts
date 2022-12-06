import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
  @Unique
  @Column
  userName: string;

  @Column
  password: string;
}