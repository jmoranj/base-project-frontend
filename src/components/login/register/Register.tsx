'use client'

import axios from 'axios'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RegisterFormData } from '@/types/users'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormData>()
  const router = useRouter()

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    console.log(data)
    try {
      const response = await axios.post(
        'http://localhost:4000/users/register',
        { ...data, photo: 'https://google.com' },
      )

      console.log('Response data:', response.data)

      if (response.status === 200) {
        router.push('/')
      } else {
        console.error('No token received')
      }
    } catch (error) {
      console.log(error)
      alert(error)
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
              {...register('name', { required: 'Username is required' })}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
              {...register('age', {
                required: 'Age is required',
                valueAsNumber: true,
              })}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.age && (
              <span className="text-red-500">{errors.age.message}</span>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label className="text-sm text-white-700 dark:text-white-200 mr-2">
              Foto:
            </label>
            <input
              type="file"
              {...register('photo', { required: 'Photo is required' })}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === getValues('password') || 'Passwords do not match',
              })}
              className="w-full px-3 dark:text-white-200 dark:bg-white-900 py-2 rounded-md border border-white-300 dark:border-white-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Entrar
          </a>
        </div>
      </div>
    </div>
  )
}
