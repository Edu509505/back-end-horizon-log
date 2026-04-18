import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PreRegistrationService } from '../service/pre_registration.service';
import { ZodValidationPipe } from 'src/common/zod-validation.pipe';
import {
  type Pre_RegistrationDTO,
  pre_registrationSchema,
} from '../dto/pre_registrationDTO';

@Controller('pre_registration')
export class PreRegistrationController {
  constructor(
    private readonly pre_registrationService: PreRegistrationService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(pre_registrationSchema))
  async createPreRegistration(@Body() preRegistrationDTO: Pre_RegistrationDTO) {
    return await this.pre_registrationService.createPreRegistration(
      preRegistrationDTO,
    );
  }
}
