import { isCPF, isDate, isPhone } from 'brazilian-values';
import * as z from 'zod';
import { validarCNH } from '../functions/validation_cnh';

export const motoristaSchema = z.object({
  caminhao_id: z.string().uuid().optional().nullable(),
  nome_completo: z.string(),
  cpf: z.string().refine((val) => isCPF(val), { error: 'CPF inválido' }),
  rg: z.string().optional().nullable(),
  data_nascimento: z
    .string()
    .refine((val) => isDate(val), { error: 'Data inválida' })
    .refine(
      (val) => {
        const [dia, mes, ano] = val.split('/').map(Number);
        const dataNasc = new Date(ano, mes - 1, dia);
        const hoje = new Date();

        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const m = hoje.getMonth() - dataNasc.getMonth();

        // Se ainda não chegou no mês/dia do aniversário, subtrai 1 ano
        if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
          idade--;
        }

        return idade >= 18;
      },
      { error: 'A idade mínima é de 18 anos' },
    ),
  numero_cnh: z
    .string()
    .refine((val) => validarCNH(val), { error: 'CNH inválido' }),
  categoria_cnh: z.string().optional().nullable(),
  validade_cnh: z
    .string()
    .refine((val) => isDate(val), { error: 'Data inválida' })
    .refine(
      (val) => {
        // Transforma "DD/MM/YYYY" em um objeto Date válido
        const [dia, mes, ano] = val.split('/').map(Number);
        const dataValidade = new Date(ano, mes - 1, dia);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // Zera o horário pra comparar só a data

        return dataValidade >= hoje; // Válido se a data for hoje ou futura
      },
      { error: 'CNH está vencida' },
    ),
  possui_curso_movimentacao_produtos_perigosos: z
    .boolean()
    .optional()
    .nullable(),
  numero_telefone: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || isPhone(val), {
    error: 'Insira um número de telefone válido',
  }),
  correio_eletronico: z.string().optional().nullable(),
  tipo_vinculo_trabalhista: z.string().optional().nullable(),
  indicador_ativo: z.boolean().optional().nullable(),
});

export const updateMotoristaSchema = motoristaSchema.partial().extend({
  id: z.string().uuid().optional(),
});

export type MotoristaDTO = z.infer<typeof motoristaSchema>;
export type UpdateMotoristaDTO = z.infer<typeof updateMotoristaSchema>;
