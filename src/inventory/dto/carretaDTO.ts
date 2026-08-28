import * as z from 'zod';

export const carretaSchema = z.object({
  caminhao_id: z.string().uuid().optional().nullable(),
  placa: z.string(),
  chassi: z.string(),
  renavam: z.string().optional(),
  modelo: z.string().optional(),
  ano_fabricacao: z.string().optional(),
  cor: z.string().optional(),
  tipo_carreta: z.string().optional(),
  quantidade_eixos: z.number().optional(),
  tipo_rodado: z.number().optional(),
  capacidade_carga_kg: z.number().optional(),
  peso_tara_kg: z.number().optional(),
  peso_bruto_total: z.number().optional(),
  comprimento_metros: z.number().optional(),
  altura_metros: z.number().optional(),
  volume_m3: z.number().optional(),
});

export const updateCarretaSchema = carretaSchema.partial().extend({
  id: z.string().uuid().optional(),
});

export type CarretaDTO = z.infer<typeof carretaSchema>;
export type UpdateCarretaDTO = z.infer<typeof updateCarretaSchema>;
