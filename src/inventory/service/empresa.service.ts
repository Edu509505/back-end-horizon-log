import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from '../entity/empresa.entity';
import { EmpresaDTO } from '../dto/empresaDTO';
import { Users } from '../entity/user.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createEmpresa(empresa: EmpresaDTO): Promise<EmpresaDTO> {
    const user = await this.userRepository.findOneBy({ id: empresa.user_id });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const novaEmpresa = this.empresaRepository.create({
      cnpj: empresa.cnpj,
      nomefantasia: empresa.nomefantasia,
      razaosocial: empresa.razaosocial,
      user: user,
    });

    return await this.empresaRepository.save(novaEmpresa);
  }

  async findAllEmpresa(): Promise<Empresa[]> {
    return await this.empresaRepository.find();
  }

  async findEmpresaId(id: string): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOneBy({ id });

    if (!empresa)
      throw new NotFoundException(`Empresa com Id: "${id}" não encontrado`);

    return empresa;
  }

  async updateEmpresa(id: string, data: Partial<Empresa>) {
    const updateEmpresa = await this.empresaRepository.findOneBy({ id });
    if (!updateEmpresa) throw new Error('Usuário Não Encontrado');

    Object.assign(updateEmpresa, data);

    return await this.empresaRepository.save(updateEmpresa);
  }

  async deleteEmpresa(id: string): Promise<void> {
    const deleteEmpresa = await this.empresaRepository.findOneBy({ id });
    if (!deleteEmpresa) throw new NotFoundException('Usuário não encontrado');
    await this.empresaRepository.delete(id);
  }
}
