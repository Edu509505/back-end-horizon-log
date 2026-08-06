import * as z from "zod"

export const notaFiscalSchema = z.object({
  ordem_de_transporte_id: z.string().uuid().optional().nullable(),
  numero_nota: z.string().optional().nullable(),
  valor_da_nota: z.number().optional().nullable(),
  empresa_emissora: z.string().optional().nullable(),
  chave_de_acesso_nfe: z.string().optional().nullable(),
});

export const updateNotaFiscalSchema = notaFiscalSchema.partial().extend({
  id: z.string().uuid().optional(),
});

export type NotaFiscalDTO = z.infer<typeof notaFiscalSchema>;
export type UpdateNotaFiscalDTO = z.infer<typeof updateNotaFiscalSchema>;