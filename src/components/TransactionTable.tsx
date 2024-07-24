import { Transaction } from "@/types/transactions";
import UpdateProduct from "./UpdateProduct";
import { useState } from "react";

interface ITransactionTable {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: ITransactionTable) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleModalOpen = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleUpdate = (updatedTransaction: Transaction) => {
    console.log("Transação atualizada:", updatedTransaction);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <section aria-labelledby="recent-heading" className="mt-16">
          <div className="space-y-20">
            <div>
              <table className="mt-4 w-full text-gray-500 sm:mt-6">
                <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                  <tr>
                    <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">Produto</th>
                    <th scope="col" className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">Preço</th>
                    <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">Data</th>
                    <th scope="col" className="pr-8 py-3 font-normal">Ações</th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                  {transactions.map(item => (
                    <tr key={item.id}>
                      <td className="py-6 pr-8">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">{item.description}</div>
                            <div className="mt-1 sm:hidden">{item.value.toFixed(2)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-red-600 hidden py-6 pr-8 sm:table-cell">{item.value.toFixed(2)}</td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{item.date.toLocaleDateString()}</td>
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
        <UpdateProduct
          isOpen={isModalOpen}
          onClose={handleModalClose}
          product={selectedTransaction}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
