import { isCPF, isDate, isPhone } from 'brazilian-values';
import * as z from 'zod';
import { validarCNH } from '../functions/validation_cnh';
import { format } from "date-fns";

export const motoristaSchema = z.object({
  empresa_id: z.string().uuid({ message: 'UUID de empresa inválido' }),
  nome_completo: z.string(),
  cpf: z.string().refine((val) => isCPF(val), { error: 'CPF inválido' }),
  rg: z.string(),
  data_nascimento: z
    .coerce.date()
    .refine((val) => isDate(format (new Date(val), "dd/MM/yyyy")), { error: 'Data inválida' })
    .refine(
      (val) => {
        const date = format (new Date(val), "dd/MM/yyyy")
        const [dia, mes, ano] = date.split('/').map(Number);
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
  categoria_cnh: z.string().optional(),
  validade_cnh: z
    .coerce.date()
    .refine((val) => isDate(format (new Date(val), "dd/MM/yyyy")), { error: 'Data inválida' })
    .refine(
      (val) => {
        // Transforma "DD/MM/YYYY" em um objeto Date válido
        const date = format (new Date(val), "dd/MM/yyyy")
        const [dia, mes, ano] = date.split('/').map(Number);
        const dataValidade = new Date(ano, mes - 1, dia);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // Zera o horário pra comparar só a data

        return dataValidade >= hoje; // Válido se a data for hoje ou futura
      },
      { error: 'CNH está vencida' },
    ),
  possui_curso_movimentacao_produtos_perigosos: z
    .boolean(),
  numero_telefone: z
    .string()
    .refine((val) => !val || isPhone(val), {
    error: 'Insira um número de telefone válido',
  }),
  tipo_vinculo_trabalhista: z.string(),
  indicador_ativo: z.boolean(),
});

export const updateMotoristaSchema = motoristaSchema.partial().extend({
  id: z.string().uuid().optional(),
});

export type MotoristaDTO = z.infer<typeof motoristaSchema>;
export type UpdateMotoristaDTO = z.infer<typeof updateMotoristaSchema>;
