import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Motorista_Service } from '../service/motorista.service';
import { ZodValidationPipe } from 'src/common/zod-validation.pipe';
import { type MotoristaDTO, motoristaSchema } from '../dto/motoristaDTO';

@UseGuards(JwtAuthGuard)
@Controller('motorista')
export class MotoristaController {
  constructor(private readonly motoristaService: Motorista_Service) {}

  @Post()
  @UsePipes(new ZodValidationPipe(motoristaSchema))
  async createMotorista(@Body() motoristaDTO: MotoristaDTO) {
    return await this.motoristaService.createMotorista(motoristaDTO);
  }
}
