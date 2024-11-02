import { useEffect, useState } from 'react'
import { Transaction } from '@/types/transactions'
import Modal from './Modal'
import Cookies from 'js-cookie'

interface UpdateTransactionProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
  onUpdate: (updatedTransaction: Transaction) => void
}

const UpdateTransaction: React.FC<UpdateTransactionProps> = ({
  isOpen,
  onClose,
  transaction,
  onUpdate,
}) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (transaction) {
      setName(transaction.description)
      setPrice(transaction.value)
      setCategory(transaction.category)
    }
  }, [transaction])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (transaction) {
      const updatedTransaction: Transaction = {
        ...transaction,
        description: name,
        value: typeof price === 'number' ? price : parseFloat(price),
        category,
      }

      const token = Cookies.get('accessToken')

      try {
        const response = await fetch(
          `http://localhost:4000/transactions/${transaction.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedTransaction),
          },
        )

        if (!response.ok) {
          throw new Error('Erro ao atualizar transação')
        }

        onUpdate(updatedTransaction)
        onClose()
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Digite o nome do produto"
              required
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Preço
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="$2999"
              required
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Categoria
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="" disabled>
                Selecionar categoria
              </option>
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="me-1 -ms-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Atualizar
        </button>
      </form>
    </Modal>
  )
}

export default UpdateTransaction
