'use client'

import axios from 'axios'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '@/schemas/registerSchema'
export default function RegisterForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('age', data.age.toString())
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('confirmPassword', data.confirmPassword)

      if (data.photo && data.photo.length > 0) {
        formData.append('photo', data.photo[0])
      }

      const response = await axios.post(
        'http://localhost:4000/users/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (response.status === 200) {
        router.push('/')
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.error)
      } else {
        alert('Ocorreu um erro inesperado')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div className="max-w-lg w-full bg-white dark:bg-white-800 rounded-lg shadow-md px-8 py-10">
        <h1 className="text-xl font-bold text-center text-white-700 dark:text-white-200 mb-8">
          Crie uma conta
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-white-700 dark:text-white-200 mr-2">
              Seu nome:
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span
              className={`text-xs mt-1 ${errors.name ? 'text-red-500' : 'text-gray-500'}`}
            >
              Mínimo de 2 caracteres
            </span>
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-white-700 dark:text-white-200 mr-2">
              Idade:
            </label>
            <input
              type="number"
              {...register('age', { valueAsNumber: true })}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span
              className={`text-xs mt-1 ${errors.age ? 'text-red-500' : 'text-gray-500'}`}
            >
              Idade mínima: 18 anos
            </span>
            {errors.age && (
              <span className="text-red-500">{errors.age.message}</span>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-white-700 dark:text-white-200 mr-2">
              Photo:
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('photo')}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span
              className={`text-xs mt-1 ${errors.photo ? 'text-red-500' : 'text-gray-500'}`}
            >
              Apenas arquivos de imagem são aceitos
            </span>
            {errors.photo && (
              <span className="text-red-500">{errors.photo.message}</span>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-white-700 dark:text-white-200 mr-2">
              Email:
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span
              className={`text-xs mt-1 ${errors.email ? 'text-red-500' : 'text-gray-500'}`}
            >
              Digite um email válido
            </span>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-white-700 dark:text-white-200 mr-2">
              Senha:
            </label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div
              className={`text-xs mt-1 ${errors.password ? 'text-red-500' : 'text-gray-500'}`}
            >
              <p>Requisitos:</p>
              <ul className="list-disc pl-4">
                <li>Mínimo 6 caracteres</li>
                <li>Uma letra maiúscula</li>
                <li>Um número</li>
              </ul>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-white-700 dark:text-white-200 mr-2">
              Confirme a senha:
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span
              className={`text-xs mt-1 ${errors.confirmPassword ? 'text-red-500' : 'text-gray-500'}`}
            >
              As senhas devem ser iguais
            </span>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
          >
            Registrar
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-white-500 dark:text-white-300">
            Você já possui uma conta?{' '}
          </span>
          <a href="/login" className="text-blue-500 hover:text-blue-600">
            Entrar
          </a>
        </div>
      </div>
    </div>
  )
}
