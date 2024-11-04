import { z } from 'zod'

export const productSchema = z.object({
  description: z.string().min(2, 'Nome precisa ter no mínimo 2 caracteres'),
  value: z.number().min(0.01, 'Preço deve ser maior que zero'),
  quantity: z.number().min(1, 'Quantidade deve ser maior que zero'),
  category: z.enum(['Entrada', 'Saída'], {
    required_error: 'Selecione uma categoria',
  }),
  image: z.any().optional(),
})

export const updateProductSchema = z.object({
  id: z.number(),
  description: z
    .string()
    .min(2, 'Nome precisa ter no mínimo 2 caracteres')
    .nonempty('Nome é obrigatório'),
  value: z
    .number()
    .min(0.01, 'Preço deve ser maior que zero')
    .nonnegative('Preço não pode ser negativo'),
  quantity: z
    .number()
    .int('Quantidade deve ser um número inteiro')
    .min(1, 'Quantidade deve ser maior que zero')
    .nonnegative('Quantidade não pode ser negativa'),
  category: z.enum(['Entrada', 'Saída'], {
    required_error: 'Selecione uma categoria',
  }),
  image: z.any().optional().or(z.string().optional()),
})

export type ProductFormData = z.infer<typeof productSchema>
export type UpdateProductFormData = z.infer<typeof updateProductSchema>
