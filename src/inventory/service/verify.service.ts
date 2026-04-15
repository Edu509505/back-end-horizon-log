import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { VerifyAccount } from '../entity/verify_account.entity';
import { VerifyDTO } from '../dto/verifyDTO';
import { Resend } from 'resend';
import { VerificationEmailTemplate } from 'src/assets/VerificationEmail';

@Injectable()
export class VerifyService {
  private resend = new Resend(process.env.RESEND_API_KEY);
  constructor(
    @InjectRepository(VerifyAccount)
    private readonly verifyRepository: Repository<VerifyAccount>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createCodeVerify(verificacao: VerifyDTO): Promise<VerifyDTO> {
    const user = await this.userRepository.findOneBy({
      id: verificacao.user_id,
    });

    if (!user) throw new NotFoundException('usuário Não Encontrado');

    let listOTP: string = '';

    for (let i = 0; i < 6; i++) {
      listOTP += Math.floor(Math.random() * (9 - i + 1) + i).toString();
    }

    const newOTP = this.verifyRepository.create({
      user: user,
      code: listOTP,
      expires_at: new Date(Date.now() + 15 * 60000),
      type: verificacao.type || 'email_verification',
    });

    await this.resend.emails.send({
      from: 'Horizon Log <onboarding@resend.dev>',
      to: user.email,
      subject: 'Seu código de acesso',
      html: VerificationEmailTemplate(user.name, listOTP),
    });

    return await this.verifyRepository.save(newOTP);
  }

  async checkCode(userId: string, code: string) {
    const verifyRegistry = await this.verifyRepository.findOne({
      where: {
        user: { id: userId },
        code: code,
      },
    });

    if (!verifyRegistry) {
      throw new UnauthorizedException('Código inválido ou inexistente.');
    }

    const now = new Date();
    if (now > verifyRegistry.expires_at) {
      throw new UnauthorizedException('Este código já expirou. Peça um novo.');
    }

    await this.userRepository.update(userId, { is_active: true });

    await this.verifyRepository.delete(verifyRegistry.id);

    return { message: 'Conta verificada com sucesso!' };
  }
}
