import * as z from 'zod';

export const ordemDeTransporteSchema = z.object({
  user_id: z.string().uuid({ message: 'UUID de usuário inválido' }),
  empresa_id: z.string().uuid({ message: 'UUID de empresa inválido' }),
  motorista_id: z.string().uuid({ message: 'UUID de motorista inválido' }),
  ordem_de_transporte: z.string(),
  status: z.string().refine((val) => {
    if(val === 'entregue' || 'concluido' || 'transito' || 'coleta' || 'aguardando' || 'ocorrencia' || 'atraso')return true
  }
    ,
    { error: 'Valor inserido inválido' },
  ),
  partida: z.string(),
  destino: z.string(),
  empresa_destino: z.string().optional(),
});

export const updateOrdemDeTransporteSchema = ordemDeTransporteSchema
  .partial()
  .extend({
    id: z.string().uuid({ message: 'UUID inválido' }),
  });

export type OrdemDeTransporteDTO = z.infer<typeof ordemDeTransporteSchema>;
export type UpdateOrdemDeTransporteDTO = z.infer<
  typeof updateOrdemDeTransporteSchema
>;
