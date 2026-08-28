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

@Entity({ name: 'carreta' })
export class Carreta {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Ordem_de_transporte, (ot) => ot.carreta, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'ordem_de_transporte' })
  ordem_de_transporte!: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.motorista, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'empresa_id' })
  empresa!: Empresa;

  @OneToMany(() => Ordem_de_transporte, (ot) => ot.carreta)
  ordemDeTransporte!: Ordem_de_transporte[];

  @Column({ name: 'placa', nullable: false })
  placa!: string;

  @Column({ name: 'chassi', nullable: false })
  chassi!: string;

  @Column({ name: 'renavam' })
  renavam!: string;

  @Column({ name: 'modelo' })
  modelo!: string;

  @Column({ name: 'ano_fabricacao' })
  ano_fabricacao!: string;

  @Column({ name: 'cor' })
  cor!: string;

  @Column({ name: 'tipo_carreta' })
  tipo_carreta!: string;

  @Column({ name: 'quantidade_eixos' })
  quantidade_eixos!: number;

  @Column({ name: 'tipo_rodado' }) //Quantidade de rodas
  tipo_rodado!: number;

  @Column({ name: 'capacidade_carga_kg' })
  capacidade_carga_kg!: number;

  @Column({ name: 'peso_tara_kg' })
  peso_tara_kg!: number;

  @Column({ name: 'peso_bruto_total' })
  peso_bruto_total!: number;

  @Column({ name: 'comprimento_metros' })
  comprimento_metros!: number;

  @Column({ name: 'altura_metros' })
  altura_metros!: number;

  @Column({ name: 'volume_m3' })
  volume_m3!: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
