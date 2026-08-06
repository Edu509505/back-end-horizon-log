import * as z from 'zod';

export const carretaSchema = z.object({
  caminhao_id: z.string().uuid().optional().nullable(),
  placa: z.string(),
  chassi: z.string(),
  renavam: z.string().optional().nullable(),
  modelo: z.string().optional().nullable(),
  ano_fabricacao: z.string().optional().nullable(),
  cor: z.string().optional().nullable(),
  tipo_carreta: z.string().optional().nullable(),
  quantidade_eixos: z.number().optional().nullable(),
  tipo_rodado: z.number().optional().nullable(),
  capacidade_carga_kg: z.number().optional().nullable(),
  peso_tara_kg: z.number().optional().nullable(),
  peso_bruto_total: z.number().optional().nullable(),
  comprimento_metros: z.number().optional().nullable(),
  altura_metros: z.number().optional().nullable(),
  volume_m3: z.number().optional().nullable(),
});

export const updateCarretaSchema = carretaSchema.partial().extend({
  id: z.string().uuid().optional(),
});

export type CarretaDTO = z.infer<typeof carretaSchema>;
export type UpdateCarretaDTO = z.infer<typeof updateCarretaSchema>;
