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
import { Motorista } from './motorista.entity';
import { Caminhao } from './caminhao.entity';
import { Carreta } from './carreta.entity';
import { Conteiner } from './container.entity';
import { Nota_fiscal } from './nota_fiscal.entity';

@Entity({ name: 'empresa' })
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // RELAÇÃO DE MUITOS PARA UM N:1
  @ManyToOne(() => Users, (user) => user.empresas, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  //RELAÇÃO DE UM PARA MUITOS 1:N 
  // @OneToMany(() => Users, (users) => users.empresa)
  // users!: Users[]

  @OneToMany(() => Nota_fiscal, (nota_fiscal) => nota_fiscal.empresa)
  nota_fiscal!: Nota_fiscal[]

  @OneToMany(() => Ordem_de_transporte, (ot) => ot.empresa)
  ordensDeTransporte!: Ordem_de_transporte[];

  @OneToMany(() => Motorista, (motorista) => motorista.empresa)
  motorista!: Motorista[];

  @OneToMany(() => Caminhao, (caminhao) => caminhao.empresa)
  caminhao!: Caminhao[];

  @OneToMany(() => Carreta, (carreta) => carreta.empresa)
  carreta!: Carreta[];

  @OneToMany(() => Conteiner, (conteiner) => conteiner.empresa)
  conteiner!: Conteiner[]

  //COLUNAS COMUNS

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
