import * as z from 'zod';

export const caminhaoSchema = z.object({
  placa: z.string(),
  chassi: z.string(),
  renavam: z.string().optional().nullable(),
  marca: z.string().optional().nullable(),
  modelo: z.string().optional().nullable(),
  ano_fabricacao: z.string().optional().nullable(),
  ano_modelo: z.string().optional().nullable(),
  cor: z.string().optional().nullable(),
  tipo_tracao: z.string().optional().nullable(),
  potencia_cavalos: z.number().optional().nullable(),
  peso_bruto_total: z.number().optional().nullable(),
  capacidade_maxima_tracao: z.number().optional().nullable(),
  peso_bruto_total_combinado: z.number().optional().nullable(),
  tipo_combustivel: z.string().optional().nullable(),
  capacidade_tanque_litros: z.number().optional().nullable(),
  capacidade_arla_litros: z.number().optional().nullable(),
  odometro_atual_quilometros: z.number().optional().nullable(),
  media_consumo_padrao_quilometros_por_litro: z.number().optional().nullable(),
});

export const updateCaminhaoSchema = caminhaoSchema.partial().extend({
  id: z.string().uuid().optional(),
});

export type CaminhaoDTO = z.infer<typeof caminhaoSchema>;
export type UpdateCaminhaoDTO = z.infer<typeof updateCaminhaoSchema>;
