import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'account' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'name', nullable: false })
  name!: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email!: string;

  @Column({ name: 'password', nullable: false })
  password!: string;

  @Column({ name: 'cpf', nullable: false })
  cpf!: string;

  @Column({ name: 'nascimento', nullable: false })
  nascimento!: string;

  @Column({ name: 'numero', nullable: false })
  numero?: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: string;
}
