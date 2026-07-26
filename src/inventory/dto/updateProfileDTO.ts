import { isDate, isPhone } from "brazilian-values"
import * as z from "zod"

export const updateProfileSchema = z.object({
    name: z.string().min(3, 'Insira um nome inválido').optional(),
    nascimento: z
    .string()
    .refine((val) => isDate(val), { error: 'Data inválida' })
    .refine(
      (val) =>
        parseInt(new Date().toString().split(' ')[3]) -
          parseInt(val.split('/')[2]) >=
        22,
      {
        error: 'A idade mínima é de 22 anos',
      },
    ).optional(),
  numero: z
    .string()
    .refine((val) => isPhone(val), { error: 'Número Inválido' })
    .optional(),
})