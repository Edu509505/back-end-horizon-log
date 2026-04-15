import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { VerificationType } from 'src/common/verification-type.enum';
import { Exclude } from 'class-transformer';
@Entity({ name: 'verify_account' })
export class VerifyAccount {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Users, (users) => users.verify, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @Column()
  user_id!: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'code' })
  code!: string;

  @Column({ type: 'enum', enum: VerificationType })
  type!: VerificationType;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expires_at!: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;
}
