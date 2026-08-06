import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Caminhao } from './caminhao.entity';

@Entity({ name: 'motorista' })
export class Motorista {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Caminhao, (caminhao) => caminhao.motorista)
  @JoinColumn({ name: 'caminhao_id' })
  caminhao_id!: string;

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

  @Column({ name: 'correio_eletronico' })
  correio_eletronico!: string;

  @Column({ name: 'tipo_vinculo_trabalhista' })
  tipo_vinculo_trabalhista!: string; // Ex: 'contratado_consolidação_leis_trabalho', 'autonomo'

  @Column({ name: 'indicador_ativo' })
  indicador_ativo!: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
