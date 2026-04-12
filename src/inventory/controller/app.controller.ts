import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Users } from '../entity/inventory.entity';
import {
  updateUserDTO,
  updateUserSchema,
  userSchema,
  type UserDTO,
} from '../dto/dto.userDTO';
import { ZodValidationPipe } from '../../common/zod-validation.pipe';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(userSchema))
  async createUsers(@Body() userDTOS: UserDTO) {
    return await this.appService.createUser(userDTOS);
  }

  @Get()
  async findAllUsers() {
    return await this.appService.findAllUsers();
  }

  @Get(':id')
  async findUserId(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<updateUserDTO> {
    return await this.appService.findUserId(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ZodValidationPipe(updateUserSchema)) body: Partial<updateUserDTO>,
  ): Promise<updateUserDTO> {
    return await this.appService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<{ message: string }> {
    await this.appService.deleteUser(id);

    return { message: `Usuário ${id} deletado com sucesso` };
  }
}
