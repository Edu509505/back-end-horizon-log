import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Empresa } from './empresa.entity';
import { VerifyAccount } from './verify_account.entity';
import { Exclude } from 'class-transformer';
import { Ordem_de_transporte } from './ordem_de_transporte.entity';

@Entity({ name: 'account' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => Empresa, (empresa) => empresa.user)
  empresas!: Empresa[];

  @OneToMany(() => VerifyAccount, (verify) => verify.user)
  verify!: VerifyAccount[];

  @OneToMany(() => Ordem_de_transporte, (ot) => ot.ordem_de_transporte_user)
  ordensDeTransporte!: Ordem_de_transporte[];

  @Column({ name: 'name', nullable: false })
  name!: string;

  @Column({ default: false })
  is_active!: boolean;

  @Column({ name: 'email', nullable: false, unique: true })
  email!: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'password', nullable: false })
  password!: string;

  @Column({ name: 'cpf', nullable: false, unique: true })
  cpf!: string;

  @Column({ name: 'nascimento', nullable: false })
  nascimento!: string;

  @Column({ name: 'numero', nullable: false, unique: true })
  numero?: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
