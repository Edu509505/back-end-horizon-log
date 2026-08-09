import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ordem_de_transporte } from '../entity/ordem_de_transporte.entity';
import { Repository } from 'typeorm';
import { Users } from '../entity/user.entity';
import { Empresa } from '../entity/empresa.entity';
import { OrdemDeTransporteDTO } from '../dto/ordem_de_transporte.DTO';

@Injectable()
export class Ordem_de_transporte_Service {
  constructor(
    @InjectRepository(Ordem_de_transporte)
    private readonly ordem_de_transporte_Repository: Repository<Ordem_de_transporte>,

    @InjectRepository(Users)
    private readonly User_Repository: Repository<Users>,

    @InjectRepository(Empresa)
    private readonly Empresa_Repository: Repository<Empresa>,

  ) {}

  async createOrdemdeTransporte(
    Ordem_de_transporte: OrdemDeTransporteDTO,
  ): Promise<OrdemDeTransporteDTO> {
    const user = await this.User_Repository.findOneBy({ id: Ordem_de_transporte.user_id, });
    const empresa = await this.Empresa_Repository.findOneBy({ id: Ordem_de_transporte.empresa_id, });

    if (!user) throw new NotFoundException('Usuário não encontrado');
    if (!empresa) throw new NotFoundException('Empresa não encontrada');

    const nova_ordem_de_transporte = this.ordem_de_transporte_Repository.create(
      {
        user: user,
        empresa: empresa,
        ordem_de_transporte: Ordem_de_transporte.ordem_de_transporte,
        partida: Ordem_de_transporte.partida,
        destino: Ordem_de_transporte.destino,
        status: Ordem_de_transporte.status,
        empresa_destino: Ordem_de_transporte.empresa_destino,

      },
    );

    return await this.ordem_de_transporte_Repository.save(
      nova_ordem_de_transporte,
    );
  }
}
