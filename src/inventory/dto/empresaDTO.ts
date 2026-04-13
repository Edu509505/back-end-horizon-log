import { isCNPJ } from 'brazilian-values';
import * as z from 'zod';

export const empresaSchema = z.object({
  cnpj: z.string().refine((val) => isCNPJ(val), { error: 'CNPJ Inválido' }),
  razaosocial: z.string().min(1, 'Insíra um nome válido'),
  nomefantasia: z.string().min(3, 'Insira um nome válido'),
  user_id: z.string().uuid({ error: 'Formato de UUID inválido' }),
});

export const updateEmpresaSchema = empresaSchema.partial().extend({
  id: z.string().uuid({ error: 'Formato de UUID inválido' }).optional(),
});

export type EmpresaDTO = z.infer<typeof empresaSchema>;
export type UpdateEmpresaDTO = z.infer<typeof updateEmpresaSchema>;
