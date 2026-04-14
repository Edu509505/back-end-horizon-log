import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import {
  updateUserDTO,
  updateUserSchema,
  userSchema,
  type UserDTO,
} from '../dto/userDTO';
import { ZodValidationPipe } from '../../common/zod-validation.pipe';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(userSchema))
  async createUsers(@Body() userDTOS: UserDTO) {
    return await this.userService.createUser(userDTOS);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUserId(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<updateUserDTO> {
    return await this.userService.findUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ZodValidationPipe(updateUserSchema)) body: Partial<updateUserDTO>,
  ): Promise<updateUserDTO> {
    return await this.userService.updateUser(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<{ message: string }> {
    await this.userService.deleteUser(id);

    return { message: `Usuário ${id} deletado com sucesso` };
  }
}
