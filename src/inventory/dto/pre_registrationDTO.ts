import * as z from 'zod';

export const pre_registrationSchema = z.object({
  email: z.email('E-mail inválido'),
  is_active: z.boolean().optional(),
});

export type Pre_RegistrationDTO = z.infer<typeof pre_registrationSchema>;
