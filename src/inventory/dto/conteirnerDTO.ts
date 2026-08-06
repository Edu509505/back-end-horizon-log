import * as z from 'zod';

export const conteinerSchema = z.object({
  ordem_de_transporte_id: z.string().uuid().optional().nullable(),
  numero_identificacao: z.string(),
  tipo_conteiner: z.string().optional().nullable(),
  tara_quilogramas: z.number().optional().nullable(),
  peso_maximo_carga_quilogramas: z.number().optional().nullable(),
  numero_lacre: z.string().optional().nullable(),
});

export const updateConteinerSchema = conteinerSchema.partial().extend({
  id: z.string().uuid().optional(),
});

export type ConteinerDTO = z.infer<typeof conteinerSchema>;
export type UpdateConteinerDTO = z.infer<typeof updateConteinerSchema>;
