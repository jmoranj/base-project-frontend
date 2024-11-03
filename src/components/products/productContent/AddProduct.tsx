import { useState } from 'react'

interface AddTransactionProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddTransaction({
  isOpen,
  onClose,
  onSuccess,
}: AddTransactionProps) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('') // Alterado para quantidade
  const [category, setCategory] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1]

    if (!token) {
      console.error('No token found')
      return
    }

    const transaction = {
      description: name,
      quantity: parseInt(quantity), // Alterado para quantidade
      date: new Date().toISOString(),
      category,
      type: 'Entrada',
    }

    try {
      const response = await fetch('http://localhost:4000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
      })

      if (!response.ok) {
        throw new Error('Erro ao adicionar transação')
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} justify-center items-center bg-black bg-opacity-50`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-600">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Adicionar um novo registro
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-500 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Digite o nome do produto"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantidade
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Quantidade de produtos"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
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
                  <option value="Saída">Saída</option>
                  <option value="Entrada">Entrada</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
