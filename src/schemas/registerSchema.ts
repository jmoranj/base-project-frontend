import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Nome precisa ter no mínimo 2 caracteres'),
    age: z.number().min(18, 'Idade mínima é 18 anos'),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(6, 'Senha deve ter no mínimo 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve ter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'Senha deve ter pelo menos um número'),
    confirmPassword: z.string(),
    photo: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, 'Foto é obrigatória')
      .refine(
        (files) => files[0]?.type.startsWith('image/'),
        'Arquivo deve ser uma imagem',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export type LoginFormData = z.infer<typeof loginSchema>
