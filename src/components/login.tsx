// pages/login.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { LoginFormData } from '@/types/users';

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log('Login data submitted:', data);
    try {
      const response = await axios.post('http://localhost:3000/users/login', data);
      

      console.log('Response data:', response.data);
      
      const { token } = response.data;
      console.log('Token received:', token);

      if (token) {
        
        Cookies.set('accessToken', token, { expires: 1 }); 
        router.push('/');
      } else {
        console.error('No token received');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiErrors = error.response?.data?.errors;
        if (apiErrors) {
          Object.keys(apiErrors).forEach(key => {
            setError(key as keyof LoginFormData, {
              type: 'manual',
              message: apiErrors[key],
            });
          });
        } else {
          console.error('API Error:', error.message);
        }
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 bg-gray-50">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Login</h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-md shadow-md">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', { required: 'Email is required' })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password', { required: 'Password is required' })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
          </div>

          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Entrar
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não possui uma conta? <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">cadastre-se</a>
        </p>
      </div>
    </div>
  );
}