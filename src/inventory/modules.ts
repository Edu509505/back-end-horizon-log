import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Empresa } from './entity/empresa.entity';
import { EmpresaController } from './controller/empresa.controller';
import { EmpresaService } from './service/empresa.service';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, Users])],
  controllers: [UserController, EmpresaController],
  providers: [UserService, EmpresaService],
  exports: [UserService],
})
export class UsersModule {}
