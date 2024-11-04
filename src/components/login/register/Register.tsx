'use client'

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '@/schemas/registerSchema'
import api from '@/api/api'

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true)
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

      const response = await api.post('/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200 || response.status === 201) {
        router.push('/login')
      }
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } }
        }
        alert(axiosError.response?.data?.message || 'Erro ao registrar usuário')
      } else {
        alert('Erro ao conectar com o servidor')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md px-8 py-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Crie sua conta
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome"
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Idade</label>
            <input
              type="number"
              {...register('age', { valueAsNumber: true })}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua idade"
            />
            {errors.age && (
              <span className="text-sm text-red-500">{errors.age.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Foto de perfil
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('photo')}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Confirme sua senha
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Já possui uma conta? </span>
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Faça login
          </a>
        </div>
      </div>
    </div>
  )
}
