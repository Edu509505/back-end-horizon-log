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
import { Pre_Registration } from './pre_registration.entity';
@Entity({ name: 'verify_account' })
export class VerifyAccount {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Users, (users) => users.verify, {
    createForeignKeyConstraints: true,
  })
  @ManyToOne(
    () => Pre_Registration,
    (pre_registration) => pre_registration.verify,
    {
      createForeignKeyConstraints: true,
    },
  )
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @JoinColumn({ name: 'pre_registration_id' })
  pre_registration!: Pre_Registration;

  @Column({ nullable: true })
  user_id!: string;

  @Column({ nullable: true })
  pre_registration_id!: string;

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
