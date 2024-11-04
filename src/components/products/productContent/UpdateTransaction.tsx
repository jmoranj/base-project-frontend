import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UpdateProductFormData,
  updateProductSchema,
} from '@/schemas/productSchema'
import { useState, useEffect } from 'react'
import Modal from './Modal'
import Cookies from 'js-cookie'
import { z } from 'zod'

// Interface que define as propriedades do componente de atualização de transação
interface UpdateTransactionProps {
  isOpen: boolean
  onClose: () => void
  transaction:
    | (z.infer<typeof updateProductSchema> & { imageUrl?: string })
    | null
  onUpdate: (updatedTransaction: z.infer<typeof updateProductSchema>) => void
}

// Componente principal para atualização de transações
const UpdateTransaction: React.FC<UpdateTransactionProps> = ({
  isOpen,
  onClose,
  transaction,
  onUpdate,
}) => {
  // Estado para armazenar a prévia da imagem
  const [imagePreview, setImagePreview] = useState<string | null>(
    transaction?.imageUrl || null,
  )

  // Configuração do formulário usando react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      id: transaction?.id,
      description: transaction?.description,
      value: transaction?.value,
      quantity: transaction?.quantity,
      category: transaction?.category,
    },
  })

  // Efeito para atualizar os valores do formulário quando a transação muda
  useEffect(() => {
    if (transaction) {
      setValue('id', transaction.id)
      setValue('description', transaction.description)
      setValue('value', transaction.value)
      setValue('quantity', transaction.quantity)
      setValue('category', transaction.category)
      setImagePreview(transaction.imageUrl || null)
    }
  }, [transaction, setValue])

  // Função para lidar com a mudança de imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Função para enviar o formulário atualizado
  const onSubmit = async (data: UpdateProductFormData) => {
    const token = Cookies.get('accessToken')
    if (!token || !transaction) return

    try {
      const formData = new FormData()
      formData.append('description', data.description)
      formData.append('value', data.value.toString())
      formData.append('quantity', data.quantity.toString())
      formData.append('category', data.category)
      formData.append('date', new Date().toISOString())

      // Verifica se há uma nova imagem selecionada
      if (data.image instanceof FileList && data.image[0]) {
        formData.append('image', data.image[0])
      } else {
        // Busca a imagem existente se não houver nova imagem
        const imageResponse = await fetch(transaction.imageUrl || '')
        const blob = await imageResponse.blob()
        const file = new File([blob], 'existing-image.jpg', {
          type: 'image/jpeg',
        })
        formData.append('image', file)
      }

      // Faz a requisição PUT para atualizar a transação
      const response = await fetch(
        `http://localhost:4000/transactions/${transaction.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      )

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to update')
      }

      onUpdate(responseData)
      onClose()
      reset()
    } catch (error) {
      console.error('Update error:', error)
    }
  }

  // Renderização do componente
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nome
            </label>
            <input
              {...register('description')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Digite o nome do produto"
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Imagem do Produto
            </label>
            <input
              type="file"
              {...register('image')}
              onChange={handleImageChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Quantidade
            </label>
            <input
              type="number"
              {...register('quantity', { valueAsNumber: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Quantidade"
            />
            {errors.quantity && (
              <span className="text-red-500">{errors.quantity.message}</span>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Valor unidade
            </label>
            <input
              type="number"
              step="0.01"
              {...register('value', { valueAsNumber: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Preço"
            />
            {errors.value && (
              <span className="text-red-500">{errors.value.message}</span>
            )}
          </div>

          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Categoria
            </label>
            <select
              {...register('category')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="Saída">Saída</option>
              <option value="Entrada">Entrada</option>
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Atualizar
        </button>
      </form>
    </Modal>
  )
}

export default UpdateTransaction
