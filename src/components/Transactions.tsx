import { useState, ReactNode } from 'react';
import AddProduct from './AddProduct.';

interface TransactionProps {
  children: ReactNode;
}

export default function Transactions({ children }: TransactionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Histórico</h1>
          <p className="mt-1 text-sm text-gray-500">Registre seu balanço de entradas e saídas.</p>
        </div>

        <section aria-labelledby="recent-heading" className="mt-16">
          <div className="space-y-20">
            <div>
              <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                  <div className="flex justify-between sm:block">
                    <dt className="font-medium text-gray-900">Último registro</dt>
                    <dd className="sm:mt-1">
                      <time>22/07/2024</time>
                    </dd>
                  </div>
                  <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                    <dt>Saldo atual</dt>
                    <dd className="sm:mt-1">-$36.00</dd>
                  </div>
                </dl>
                <button
                  onClick={handleModalOpen}
                  className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
                >
                  Adicionar novo registro
                </button>
              </div>

              <table className="mt-4 w-full text-gray-500 sm:mt-6">
                <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                  <tr>
                    <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">Produto</th>
                    <th scope="col" className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">Preço</th>
                    <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">Data</th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                  <tr>
                    <td className="py-6 pr-8">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-gray-900">Óculos de sol</div>
                          <div className="mt-1 sm:hidden">$36.00</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-red-600 hidden py-6 pr-8 sm:table-cell">$36.00</td>
                    <td className="hidden py-6 pr-8 sm:table-cell">22/07/2024</td>
                    <td className="py-6 font-medium text-right whitespace-nowrap">
                      <a href="#" className="text-black">Editar</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <AddProduct isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}
