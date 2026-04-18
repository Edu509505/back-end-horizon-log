import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { type VerifyDTO, verifySchema } from '../dto/verifyDTO';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { ZodValidationPipe } from 'src/common/zod-validation.pipe';
import { VerifyService } from '../service/verify.service';

// @UseGuards(JwtAuthGuard)
@Controller('verify')
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(verifySchema))
  async createVerify(@Body() verifyDTO: VerifyDTO) {
    return await this.verifyService.createCodeVerify(verifyDTO);
  }

  // @Post('pre-registration')
  // @UsePipes(new ZodValidationPipe(verifySchema))
  // async createPreRegistration(@Body() verifyDTO: VerifyDTO) {
  //   return await this.verifyService.createCodeOTPRregistration(verifyDTO);
  // }

  @Post('check')
  async checkCode(
    @Body()
    data: {
      code: string;
      user_id: string;
      pre_registration_id: string;
    },
  ) {
    return await this.verifyService.checkCode(
      data.code,
      data.user_id,
      data.pre_registration_id,
    );
  }
}
