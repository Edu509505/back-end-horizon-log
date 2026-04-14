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
import { ZodValidationPipe } from 'src/common/zod-validation.pipe';
import {
  type EmpresaDTO,
  empresaSchema,
  UpdateEmpresaDTO,
  updateEmpresaSchema,
} from '../dto/empresaDTO';
import { EmpresaService } from '../service/empresa.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(empresaSchema))
  async createEmpresa(@Body() empresaDTO: EmpresaDTO) {
    return await this.empresaService.createEmpresa(empresaDTO);
  }

  @Get()
  async findAllEmpresa() {
    return await this.empresaService.findAllEmpresa();
  }

  @Get(':id')
  async findEmpresaId(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UpdateEmpresaDTO> {
    return await this.empresaService.findEmpresaId(id);
  }

  @Patch(':id')
  async updateEmpresa(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ZodValidationPipe(updateEmpresaSchema))
    body: Partial<UpdateEmpresaDTO>,
  ): Promise<UpdateEmpresaDTO> {
    return await this.empresaService.updateEmpresa(id, body);
  }

  @Delete(':id')
  async deleteEmpresa(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<{ message: string }> {
    await this.empresaService.deleteEmpresa(id);

    return { message: `Usuário ${id} deletado com sucesso` };
  }
}
