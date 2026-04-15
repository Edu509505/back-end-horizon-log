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

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, Users, VerifyAccount])],
  controllers: [UserController, EmpresaController, VerifyController],
  providers: [UserService, EmpresaService, VerifyService],
  exports: [UserService],
})
export class UsersModule {}
