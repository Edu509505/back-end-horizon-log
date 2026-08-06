import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ordem_de_transporte } from './ordem_de_transporte.entity';

@Entity({ name: 'conteiner' })
export class Conteiner {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // A qual O.T este contêiner pertence nesta viagem
  @ManyToOne(() => Ordem_de_transporte, (ordem) => ordem.conteineres)
  @JoinColumn({ name: 'ordem_de_transporte_id' })
  ordem_de_transporte!: Ordem_de_transporte;

  @Column({ name: 'numero_identificacao', nullable: false }) // Ex: "MSCU1234567"
  numero_identificacao!: string;

  @Column({ name: 'tipo_conteiner' }) // Ex: "20_DRY", "40_HIGH_CUBE", "REFFER"
  tipo_conteiner!: string;

  @Column({ name: 'tara_quilogramas' })
  tara_quilogramas!: number;

  @Column({ name: 'peso_maximo_carga_quilogramas' })
  peso_maximo_carga_quilogramas!: number;

  @Column({ name: 'numero_lacre' }) // Lacres do armador/alfândega
  numero_lacre!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
