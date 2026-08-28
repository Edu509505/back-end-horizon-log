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
import { Motorista } from './motorista.entity';
import { Caminhao } from './caminhao.entity';
import { Carreta } from './carreta.entity';

@Entity({ name: 'ordem_de_transporte' })
export class Ordem_de_transporte {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // RELAÇÃO DE MUITOS PARA UM N:1
  @ManyToOne(() => Empresa, (empresa) => empresa.ordensDeTransporte, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'empresa_id' })
  empresa!: Empresa;

  @ManyToOne(() => Users, (user) => user.ordensDeTransporte, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @Column()
  motorista_id!: string;

  @ManyToOne(() => Motorista, (motorista) => motorista.ordemDeTransporte)
  @JoinColumn({ name: 'motorista_id' })
  motorista!: Motorista;

  @ManyToOne(() => Caminhao, (caminhao) => caminhao.ordemDeTransporte)
  @JoinColumn({ name: 'caminhao_id' })
  caminhao!: Caminhao;

  @ManyToOne(() => Carreta, (carreta) => carreta.ordemDeTransporte)
  @JoinColumn({ name: 'carreta_id' })
  carreta!: Carreta;

  @ManyToOne(() => Conteiner, (conteiner) => conteiner.ordemDeTransporte, {
    nullable: true,
  })
  @JoinColumn({ name: 'conteiner_id' })
  conteiner!: Conteiner;

  //RELAÇÃO DE UM PARA MUITOS 1:N

  @OneToMany(() => Nota_fiscal, (nf) => nf.ordem_de_transporte)
  nota_fiscal!: Nota_fiscal[];

  //COLUNAS COMUNS

  @Column({ nullable: true })
  user_id!: string;

  @Column({ nullable: true })
  empresa_id!: string;

  @Column({ name: 'ordem_de_transporte', nullable: false })
  ordem_de_transporte!: string;

  @Column({ name: 'status', nullable: false })
  status!: string;

  @Column({ name: 'partida', nullable: false })
  partida!: string;

  @Column({ name: 'destino', nullable: false })
  destino!: string;

  @Column({ name: 'empresa_destino', nullable: false })
  empresa_destino!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
