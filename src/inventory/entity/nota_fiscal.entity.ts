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
import { Empresa } from './empresa.entity';

@Entity({ name: 'nota_fiscal' })
export class Nota_fiscal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Ordem_de_transporte, (ot) => ot.nota_fiscal)
  @JoinColumn({ name: 'ordem_de_transporte' })
  ordem_de_transporte!: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.nota_fiscal)
  @JoinColumn({ name: 'empresa_id' })
  empresa!: string;

  @Column({ name: 'numero_nota' })
  numero_nota!: string;

  @Column({ name: 'valor_da_nota' })
  valor_da_nota!: number;

  @Column({ name: 'empresa_emissora' })
  empresa_emissora!: string;

  @Column({ name: 'chave_de_acesso_nfe' })
  chave_de_acesso_nfe!: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;
}
