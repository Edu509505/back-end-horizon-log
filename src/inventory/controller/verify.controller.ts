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
  async createEmpresa(@Body() verifyDTO: VerifyDTO) {
    return await this.verifyService.createCodeVerify(verifyDTO);
  }

  @Post('check')
  async checkCode(@Body() data: { user_id: string; code: string }) {
    return await this.verifyService.checkCode(data.user_id, data.code);
  }
}
