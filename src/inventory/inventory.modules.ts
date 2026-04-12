import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AppController],
  providers: [AppService],
})
export class UsersModule {}
