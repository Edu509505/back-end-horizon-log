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
import { Ordem_de_transporte } from './ordem_de_transporte.entity';
import { Empresa } from './empresa.entity';

@Entity({ name: 'motorista' })
export class Motorista {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Ordem_de_transporte, (ot) => ot.motorista)
  @JoinColumn({ name: 'ordem_de_transporte' })
  ordem_de_transporte!: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.motorista, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'empresa_id' })
  empresa!: Empresa;

  @OneToMany(() => Ordem_de_transporte, (ot) => ot.motorista)
  ordemDeTransporte!: Ordem_de_transporte[];

  @Column()
  empresa_id!: string

  @Column({ name: 'nome_completo', nullable: false })
  nome_completo!: string;

  @Column({ name: 'cpf', nullable: false })
  cpf!: string;

  @Column({ name: 'rg' })
  rg!: string;

  @Column({ name: 'data_nascimento' })
  data_nascimento!: Date;

  @Column({ name: 'numero_cnh', nullable: false })
  numero_cnh!: string;

  @Column({ name: 'categoria_cnh' })
  categoria_cnh!: string; // Ex: 'D', 'E', 'ACDE'

  @Column({ name: 'validade_cnh' })
  validade_cnh!: Date;

  @Column({ name: 'possui_curso_movimentacao_produtos_perigosos' })
  possui_curso_movimentacao_produtos_perigosos!: boolean; // MOPP

  @Column({ name: 'numero_telefone' })
  numero_telefone!: string;

  @Column({ name: 'tipo_vinculo_trabalhista' })
  tipo_vinculo_trabalhista!: string; // Ex: 'contratado_consolidação_leis_trabalho', 'autonomo'

  @Column({ name: 'indicador_ativo' })
  indicador_ativo!: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
