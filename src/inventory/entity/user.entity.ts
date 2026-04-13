import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Empresa } from './empresa.entity';

@Entity({ name: 'account' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => Empresa, (empresa) => empresa.user)
  empresas!: Empresa[];

  @Column({ name: 'name', nullable: false })
  name!: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email!: string;

  @Column({ name: 'password', nullable: false })
  password!: string;

  @Column({ name: 'cpf', nullable: false, unique: true })
  cpf!: string;

  @Column({ name: 'nascimento', nullable: false })
  nascimento!: string;

  @Column({ name: 'numero', nullable: false, unique: true })
  numero?: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: string;
}
