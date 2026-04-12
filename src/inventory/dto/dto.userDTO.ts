import { isCPF, isDate, isPhone } from 'brazilian-values';
import * as z from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, 'Insira um nome inválido'),
  email: z.string().email('Insira um E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 digitos'),
  cpf: z.string().refine((val) => isCPF(val), { error: 'CPF inválido' }),
  nascimento: z
    .string()
    .refine((val) => isDate(val), { error: 'Data inválida' })
    .refine((val) => 2026 - parseInt(val.split('/')[2]) > 22, {
      error: 'A idade mínima é de 22 anos',
    }),
  numero: z
    .string()
    .refine((val) => isPhone(val), { error: 'Número Inválido' })
    .optional(),
});

export const updateUserSchema = userSchema.partial().extend({
  id: z
    .string()
    .uuid({ message: 'O formato do UUID está inválido' })
    .optional(),
});

export type UserDTO = z.infer<typeof userSchema>;
export type updateUserDTO = z.infer<typeof updateUserSchema>;
