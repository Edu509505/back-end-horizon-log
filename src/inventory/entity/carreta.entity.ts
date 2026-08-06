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

@Entity({ name: 'carreta' })
export class Carreta {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Caminhao, (caminhao) => caminhao.carreta)
  @JoinColumn({ name: 'caminhao_id' })
  caminhao_id!: string;

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
