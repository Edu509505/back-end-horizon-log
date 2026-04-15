import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity({ name: 'empresa' })
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Users, (user) => user.empresas, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @Column()
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
