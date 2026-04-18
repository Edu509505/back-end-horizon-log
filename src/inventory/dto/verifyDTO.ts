import { VerificationType } from 'src/common/verification-type.enum';
import z from 'zod';

export const verifySchema = z.object({
  user_id: z.string().uuid('Id inválido').optional(),
  pre_registration_id: z.string().optional(),
  code: z
    .string()
    .length(6, 'Código inválido, necessário 6 digitos')
    .optional(),
  type: z.nativeEnum(VerificationType),
});

export type VerifyDTO = z.infer<typeof verifySchema>;
