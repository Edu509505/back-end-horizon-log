import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Empresa } from './entity/empresa.entity';
import { EmpresaController } from './controller/empresa.controller';
import { EmpresaService } from './service/empresa.service';
import { VerifyService } from './service/verify.service';
import { VerifyController } from './controller/verify.controller';
import { VerifyAccount } from './entity/verify_account.entity';
import { Pre_Registration } from './entity/pre_registration.entity';
import { PreRegistrationController } from './controller/pre_registration.controller';
import { PreRegistrationService } from './service/pre_registration.service';
import { MotoristaController } from './controller/motorista.controller';
import { Motorista_Service } from './service/motorista.service';
import { Motorista } from './entity/motorista.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empresa, Users, VerifyAccount, Pre_Registration, Motorista]),
  ],
  controllers: [
    UserController,
    EmpresaController,
    VerifyController,
    PreRegistrationController,
    MotoristaController
  ],
  providers: [
    UserService,
    EmpresaService,
    VerifyService,
    PreRegistrationService,
    Motorista_Service
  ],
  exports: [UserService],
})
export class UsersModule {}
