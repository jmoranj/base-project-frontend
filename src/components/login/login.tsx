'use client'

import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/schemas/registerSchema'
import { useUser } from '@/contexts/UserContext'

export default function Login() {
  const router = useRouter()
  const { setUserPhoto } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      // Get token from login
      const loginResponse = await axios.post(
        'http://localhost:4000/users/login',
        data,
        { withCredentials: true },
      )

      const { token } = loginResponse.data

      if (token) {
        Cookies.set('accessToken', token, { expires: 1 })

        // Get user ID from validate-jwt
        const validateResponse = await axios.get(
          'http://localhost:4000/users/validate-jwt',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const userId = validateResponse.data.decoded.id

        // Get user data using the ID
        const userResponse = await axios.get(
          `http://localhost:4000/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        setUserPhoto(userResponse.data.photo)
        router.push('/')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('root', {
          type: 'manual',
          message:
            error.response?.status === 401
              ? 'Email ou senha incorretos'
              : 'Erro ao fazer login. Tente novamente.',
        })
      }
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 bg-gray-50">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Faça seu login
        </h1>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-6 rounded-md shadow-md"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            {errors.root && (
              <div className="p-2 text-center bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.root.message}
              </div>
            )}

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Entrar
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não possui uma conta?{' '}
            <Link
              href="/login/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
