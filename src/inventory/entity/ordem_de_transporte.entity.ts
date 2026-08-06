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
import { Empresa } from './empresa.entity';
import { Users } from './user.entity';
import { Nota_fiscal } from './nota_fiscal.entity';
import { Conteiner } from './container.entity';

@Entity({ name: 'ordem_de_transporte' })
export class Ordem_de_transporte {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Relação com Empresa (Muitas O.Ts para 1 Empresa)
  @ManyToOne(() => Empresa, (empresa) => empresa.ordensDeTransporte)
  @JoinColumn({ name: 'empresa_id' })
  ordem_de_transporte_empresa!: Empresa;

  // Relação com Usuário (Muitas O.Ts para 1 Usuário)
  @ManyToOne(() => Users, (user) => user.ordensDeTransporte)
  @JoinColumn({ name: 'user_id' })
  ordem_de_transporte_user!: Users;

  @OneToMany(() => Nota_fiscal, (nf) => nf.ordem_de_transporte_id)
  nota_fiscal!: Nota_fiscal[]

  @OneToMany(() => Conteiner, (conteiner) => conteiner.ordem_de_transporte)
  conteineres!: Conteiner[]

  @Column({ nullable: true })
  user_id!: string;

  @Column({ nullable: true })
  empresa_id!: string;

  @Column({ name: "ordem_de_servico", nullable: false })
  ordem_de_transporte!: string;

  @Column({ name: "status", nullable: false })
  status!: string;

  @Column({ name: "partida", nullable: false })
  partida!: string;

  @Column({ name: "destino", nullable: false })
  destino!: string;

  @Column({ name: "empresa_destino" })
  empresa_destino!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
