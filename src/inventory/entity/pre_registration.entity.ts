import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VerifyAccount } from './verify_account.entity';

@Entity({ name: 'pre_registration' })
export class Pre_Registration {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => VerifyAccount, (verify) => verify.pre_registration)
  verify!: VerifyAccount[];

  @Column({ name: 'email', nullable: false, unique: true })
  email!: string;

  @Column({ default: false })
  is_active!: boolean;
}
