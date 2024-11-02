import { useState, useEffect } from 'react'
import { Transaction } from '@/types/transactions'
import UpdateTransaction from './updateTransaction/UpdateTransaction'

interface ITransactionTable {
  transactions: Transaction[]
}

const formatToBRL = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default function TransactionTable({ transactions }: ITransactionTable) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [userTransactions, setUserTransactions] =
    useState<Transaction[]>(transactions)

  useEffect(() => {
    setUserTransactions(transactions)
  }, [transactions])

  const handleModalOpen = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedTransaction(null)
  }

  const handleUpdate = async (UpdateTransaction: Transaction) => {
    console.log('Transação atualizada:', UpdateTransaction)

    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1]

    if (!token) {
      console.error('No token found')
      return
    }

    try {
      const response = await fetch(
        `http://localhost:4000/transactions/${UpdateTransaction.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(UpdateTransaction),
        },
      )

      if (!response.ok) {
        throw new Error('Erro ao atualizar transação')
      }

      setUserTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === UpdateTransaction.id
            ? UpdateTransaction
            : transaction,
        ),
      )
    } catch (error) {
      console.error('Error updating transaction:', error)
    }
  }

  const getPriceColor = (type: string) => {
    switch (type) {
      case 'Entrada':
        return 'text-green-600'
      case 'Saída':
        return 'text-red-600'
      default:
        return 'text-gray-900'
    }
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <section aria-labelledby="recent-heading" className="mt-16">
          <div className="space-y-20">
            <div>
              <table className="mt-4 w-full text-gray-500 sm:mt-6">
                <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                  <tr>
                    <th
                      scope="col"
                      className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal text-left"
                    >
                      Produto
                    </th>
                    <th
                      scope="col"
                      className="hidden w-1/5 pr-8 py-3 font-normal text-right sm:table-cell"
                    >
                      Preço
                    </th>
                    <th
                      scope="col"
                      className="hidden pr-8 py-3 font-normal text-right sm:table-cell"
                    >
                      Data
                    </th>
                    <th
                      scope="col"
                      className="pr-8 py-3 font-normal text-right"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                  {userTransactions.map((item) => (
                    <tr key={item.id}>
                      <td className="py-6 pr-8 text-left">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.description}
                            </div>
                            <div className="mt-1 sm:hidden">
                              {formatToBRL(item.value)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`py-6 pr-8 ${getPriceColor(item.category)} hidden sm:table-cell text-right`}
                      >
                        {formatToBRL(item.value)}
                      </td>
                      <td className="hidden py-6 pr-8 text-right sm:table-cell">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="py-6 font-medium text-right whitespace-nowrap">
                        <button
                          onClick={() => handleModalOpen(item)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {selectedTransaction && (
        <UpdateTransaction
          isOpen={isModalOpen}
          onClose={handleModalClose}
          transaction={selectedTransaction}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}
