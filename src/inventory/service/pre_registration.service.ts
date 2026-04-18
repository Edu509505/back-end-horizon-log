import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pre_RegistrationDTO } from '../dto/pre_registrationDTO';
import { Pre_Registration } from '../entity/pre_registration.entity';

@Injectable()
export class PreRegistrationService {
  constructor(
    @InjectRepository(Pre_Registration)
    private readonly preRegistrationrepository: Repository<Pre_Registration>,
  ) {}
  async createPreRegistration(
    preRegistration: Pre_RegistrationDTO,
  ): Promise<Pre_RegistrationDTO> {
    return await this.preRegistrationrepository.save(preRegistration);
  }
}
