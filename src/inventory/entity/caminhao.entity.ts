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

@Entity({ name: 'caminhao' })
export class Caminhao {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Ordem_de_transporte, (ot) => ot.caminhao, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'ordem_de_transporte' })
  ordem_de_transporte!: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.caminhao, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'empresa_id' })
  empresa!: Empresa;

  @OneToMany(() => Ordem_de_transporte, (ot) => ot.caminhao)
  ordemDeTransporte!: Ordem_de_transporte[];

  @Column({ name: 'placa', nullable: false })
  placa!: string;

  @Column({ name: 'chassi', nullable: false })
  chassi!: string;

  @Column({ name: 'renavam' })
  renavam!: string;

  @Column({ name: 'marca' })
  marca!: string;

  @Column({ name: 'modelo' })
  modelo!: string;

  @Column({ name: 'ano_fabricacao' })
  ano_fabricacao!: string;

  @Column({ name: 'ano_modelo' })
  ano_modelo!: string;

  @Column({ name: 'cor' })
  cor!: string;

  @Column({ name: 'tipo_tracao' })
  tipo_tracao!: string;

  @Column({ name: 'potencia_cavalos' })
  potencia_cavalos!: number;

  @Column({ name: 'peso_bruto_total' })
  peso_bruto_total!: number;

  @Column({ name: 'capacidade_maxima_tracao' })
  capacidade_maxima_tracao!: number;

  @Column({ name: 'peso_bruto_total_combinado' })
  peso_bruto_total_combinado!: number;

  @Column({ name: 'tipo_combustivel' })
  tipo_combustivel!: string;

  @Column({ name: 'capacidade_tanque_litros' })
  capacidade_tanque_litros!: number;

  @Column({ name: 'capacidade_arla_litros' })
  capacidade_arla_litros!: number;

  @Column({ name: 'odometro_atual_quilometros' })
  odometro_atual_quilometros!: number;

  @Column({ name: 'media_consumo_padrao_quilometros_por_litro' })
  media_consumo_padrao_quilometros_por_litro!: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
