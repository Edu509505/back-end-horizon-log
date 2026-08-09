import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Ordem_de_transporte } from './ordem_de_transporte.entity';

@Entity({ name: 'empresa' })
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // 1. Relação com Usuário (Muitas empresas para 1 usuário)
  @ManyToOne(() => Users, (user) => user.empresas, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  // 2. Relação com Ordem de Transporte (1 empresa para várias O.Ts)
  @OneToMany(() => Ordem_de_transporte, (ot) => ot.empresa)
  ordensDeTransporte!: Ordem_de_transporte[];

  @Column({ nullable: true })
  user_id!: string;

  @Column({ name: 'cnpj', nullable: false, unique: true })
  cnpj!: string;

  @Column({ name: 'razaosocial', nullable: false })
  razaosocial!: string;

  @Column({ name: 'nomefantasia', nullable: false })
  nomefantasia!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
