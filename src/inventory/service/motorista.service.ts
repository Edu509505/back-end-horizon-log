import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Motorista } from '../entity/motorista.entity';
import { Repository } from 'typeorm';
import { Empresa } from '../entity/empresa.entity';
import { MotoristaDTO } from '../dto/motoristaDTO';

@Injectable()
export class Motorista_Service {
  constructor(
    @InjectRepository(Motorista)
    private readonly motorista_Repository: Repository<Motorista>,

    @InjectRepository(Empresa)
    private readonly empresa_Repository: Repository<Empresa>,
  ) {}

  async createMotorista(Motorista: MotoristaDTO): Promise<Motorista> {
    const empresa = await this.empresa_Repository.findOneBy({
      id: Motorista.empresa_id,
    });

    if (!empresa) throw new NotFoundException('Empresa não encontrada');

    const novoMotorista = this.motorista_Repository.create({
      empresa: empresa,
      nome_completo: Motorista.nome_completo,
      rg: Motorista.rg,
      cpf: Motorista.cpf,
      numero_cnh: Motorista.numero_cnh,
      categoria_cnh: Motorista.categoria_cnh,
      validade_cnh: Motorista.validade_cnh,
      numero_telefone: Motorista.numero_telefone,
      tipo_vinculo_trabalhista: Motorista.tipo_vinculo_trabalhista,
      data_nascimento: Motorista.data_nascimento,
      indicador_ativo: Motorista.indicador_ativo,
      possui_curso_movimentacao_produtos_perigosos:
        Motorista.possui_curso_movimentacao_produtos_perigosos,
    });

    // ✅ CORRIGIDO: Agora salvando no repository do Motorista!
    return await this.motorista_Repository.save(novoMotorista);
  }
}