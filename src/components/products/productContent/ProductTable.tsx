import { useState, useEffect } from 'react'
import UpdateTransaction from './UpdateTransaction'
import Cookies from 'js-cookie'
import { UpdateProductFormData } from '@/schemas/productSchema'

interface Transaction extends UpdateProductFormData {
  imagePath: string
  imageUrl?: string
}

interface ITransactionTable {
  transactions: Transaction[]
}

export default function TransactionTable({ transactions }: ITransactionTable) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const transactionsWithImageUrls = transactions.map((transaction) => ({
      ...transaction,
      imageUrl: transaction.imagePath
        ? `http://localhost:4000${transaction.imagePath}`
        : undefined,
    }))
    console.log('Processed transactions:', transactionsWithImageUrls)
    setUserTransactions(transactionsWithImageUrls)
  }, [transactions])

  const handleModalOpen = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedTransaction(null)
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const handleUpdate = async (
    updatedTransaction: Omit<Transaction, 'imagePath'> & { image?: FileList },
  ) => {
    const token = Cookies.get('accessToken')
    if (!token) return

    try {
      const formData = new FormData()
      formData.append('description', updatedTransaction.description)
      formData.append('value', updatedTransaction.value.toString())
      formData.append('quantity', updatedTransaction.quantity.toString())
      formData.append('category', updatedTransaction.category)
      formData.append('date', new Date().toISOString())

      if (
        updatedTransaction.image instanceof FileList &&
        updatedTransaction.image[0]
      ) {
        formData.append('image', updatedTransaction.image[0])
      }

      await fetch(
        `http://localhost:4000/transactions/${updatedTransaction.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      )

      setTimeout(() => {
        handleModalClose()
        window.location.reload()
      }, 200)
    } catch (error) {
      setTimeout(() => {
        handleModalClose()
        window.location.reload()
      }, 200)
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
            <div className="sm:hidden">
              {userTransactions.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 p-4 border rounded-lg shadow"
                >
                  <div className="flex items-center space-x-4">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.description}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          console.log('Image load error:', e)
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">
                          {item.description}
                        </h3>
                        <button
                          onClick={() => handleModalOpen(item)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Editar
                        </button>
                      </div>
                      <div
                        className={`${getPriceColor(item.category)} font-medium`}
                      >
                        {formatPrice(item.value)}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Quantidade: {item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-gray-500">
                <thead className="text-sm text-gray-500 text-left">
                  <tr>
                    <th scope="col" className="w-32 px-4 py-3 font-normal">
                      Imagem
                    </th>
                    <th
                      scope="col"
                      className="w-2/5 lg:w-1/3 px-4 py-3 font-normal"
                    >
                      Produto
                    </th>
                    <th
                      scope="col"
                      className="w-1/5 px-4 py-3 font-normal text-center"
                    >
                      Quantidade
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-normal text-center"
                    >
                      Valor
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-normal text-center"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm border-t">
                  {userTransactions.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4">
                        {item.imageUrl && (
                          <div className="w-16 h-16 min-w-[4rem]">
                            <img
                              src={item.imageUrl}
                              alt={item.description}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                console.log('Image load error:', e)
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                              }}
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-900">
                          {item.description}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">{item.quantity}</td>
                      <td
                        className={`px-4 py-4 ${getPriceColor(item.category)} text-center`}
                      >
                        {formatPrice(item.value)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleModalOpen(item)}
                          className="text-blue-500 hover:text-blue-700 inline-flex items-center justify-center"
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
