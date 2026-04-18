import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entity/user.entity';
import { VerifyAccount } from '../entity/verify_account.entity';
import { Pre_Registration } from '../entity/pre_registration.entity';
import { Repository } from 'typeorm';
import { VerifyDTO } from '../dto/verifyDTO';
import { Resend } from 'resend';
import { VerificationEmailTemplate } from 'src/assets/VerificationEmail';
import { VerificationPreRegistrationTemplate } from 'src/assets/VerificationPreRegistration';

@Injectable()
export class VerifyService {
  private resend = new Resend(process.env.RESEND_API_KEY);
  private fromEmail = process.env.FROM_EMAIL!;
  constructor(
    @InjectRepository(Pre_Registration)
    private readonly Pre_RegistrationRepository: Repository<Pre_Registration>,

    @InjectRepository(VerifyAccount)
    private readonly verifyRepository: Repository<VerifyAccount>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createCodeVerify(verificacao: VerifyDTO): Promise<VerifyDTO> {
    let user: Users | null = null;
    let pre_registration: Pre_Registration | null = null;
    let targetEmail = '';
    let targetName = '';

    if (!verificacao.pre_registration_id && !verificacao.user_id)
      throw new BadRequestException('Credenciais não recebidas');

    if (verificacao.user_id) {
      user = await this.userRepository.findOneBy({
        id: verificacao.user_id,
      });

      if (!user) throw new NotFoundException('usuário Não Encontrado');

      targetEmail = user.email;
      targetName = user.name;
    }

    if (verificacao.pre_registration_id) {
      pre_registration = await this.Pre_RegistrationRepository.findOneBy({
        id: verificacao.pre_registration_id,
      });

      if (!pre_registration)
        throw new NotFoundException('usuário Não Encontrado');

      targetEmail = pre_registration.email;
      targetName = pre_registration.email;
    }

    let listOTP: string = '';

    for (let i = 0; i < 6; i++) {
      listOTP += Math.floor(Math.random() * (9 - i + 1) + i).toString();
    }

    console.log('Pré Registro ID ', pre_registration?.id);

    const newOTP = this.verifyRepository.create({
      pre_registration_id: pre_registration?.id,
      user_id: user?.id,
      code: listOTP,
      expires_at: new Date(Date.now() + 15 * 60000),
      type: verificacao.type || 'email_verification',
    });

    await this.resend.emails.send({
      from: this.fromEmail,
      to: targetEmail,
      subject: 'Seu código de acesso',
      html: VerificationEmailTemplate(targetName, listOTP),
    });

    return await this.verifyRepository.save(newOTP);
  }

  async checkCode(code: string, userId: string, pre_registration: string) {
    console.log(pre_registration);

    const finalUserId =
      typeof userId === 'object' ? (userId as Users)?.id : userId;

    const finalPreId =
      typeof pre_registration === 'object'
        ? (pre_registration as Pre_Registration)?.id
        : pre_registration;

    const verifyRegistry = await this.verifyRepository.findOne({
      where: [
        {
          code: code,
          user_id: finalUserId,
        },
        {
          code: code,
          pre_registration_id: finalPreId,
        },
      ],
    });

    console.log('Buscando com Code:', code);
    console.log('ID do User:', finalUserId || userId);
    console.log('ID do Pré:', finalPreId || pre_registration);

    if (!verifyRegistry) {
      throw new UnauthorizedException('Código inválido ou inexistente.');
    }

    const now = new Date();
    if (now > verifyRegistry.expires_at) {
      throw new UnauthorizedException(
        'Este código já expirou. solicite um novo.',
      );
    }
    if (verifyRegistry.user_id) {
      await this.userRepository.update(verifyRegistry.user_id, {
        is_active: true,
      });
    }
    if (verifyRegistry.pre_registration_id) {
      await this.userRepository.update(verifyRegistry.pre_registration_id, {
        is_active: true,
      });
    }

    await this.verifyRepository.delete(verifyRegistry.id);

    return { message: 'Conta verificada com sucesso!' };
  }
}
