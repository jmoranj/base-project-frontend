import { useEffect, useState } from 'react'
import AddTransaction from '../products/productContent/AddProduct'
import { UpdateProductFormData } from '@/schemas/productSchema'

interface BalanceProps {
  transactions: (UpdateProductFormData & { date: string })[]
  isModalOpen: boolean
  handleModalOpen: () => void
  handleModalClose: () => void
  onTransactionSuccess: () => void
}

export default function Balance({
  transactions,
  isModalOpen,
  handleModalOpen,
  handleModalClose,
  onTransactionSuccess,
}: BalanceProps) {
  const [stock, setStock] = useState<number>(0)
  const [lastTransactionDate, setLastTransactionDate] = useState<Date | null>(
    null,
  )

  useEffect(() => {
    const calculateStock = () => {
      const totalStock = transactions.reduce((acc, transaction) => {
        const value = transaction.value * transaction.quantity
        return transaction.category === 'Entrada' ? acc + value : acc - value
      }, 0)
      setStock(totalStock)
    }

    const findLastTransactionDate = () => {
      if (transactions.length > 0) {
        const latestDate = transactions.reduce((latest, transaction) => {
          const transactionDate = new Date(transaction.date)
          return transactionDate > latest ? transactionDate : latest
        }, new Date(transactions[0].date))
        setLastTransactionDate(latestDate)
      }
    }

    calculateStock()
    findLastTransactionDate()
  }, [transactions])

  return (
    <>
      <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
        <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
          <div className="flex justify-between sm:block">
            <dt className="font-medium text-gray-900">Último registro</dt>
            <dd className="sm:mt-1">
              <time>
                {lastTransactionDate
                  ? lastTransactionDate.toLocaleDateString('pt-BR')
                  : 'N/A'}
              </time>
            </dd>
          </div>
          <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
            <dt>Faturamento</dt>
            <dd className="sm:mt-1">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(stock)}
            </dd>
          </div>
        </dl>
        <button
          onClick={handleModalOpen}
          className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
        >
          Adicionar novo produto
        </button>
      </div>
      <AddTransaction
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={onTransactionSuccess}
      />
    </>
  )
}
