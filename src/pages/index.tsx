import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import TransactionTable from '@/components/TransactionTable';
import Balance from '@/components/Balance';
import TransactionContainer from '@/components/TransactionContainer';
import api from './api/api';
import { Transaction } from '@/types/transactions';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];

      if (!token) {
        router.push('/login');
      } else {
        fetchTransactions();
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    checkAuthentication();
  }, [router]);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddProductSuccess = () => {
    // Re-fetch transactions to update the list
    fetchTransactions();
  };

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions', error);
    }
  };

  return (
    <Layout>
      <TransactionContainer>
        <Title />
        <Balance
          transactions={transactions}
          isModalOpen={isModalOpen}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
          onTransactionSuccess={handleAddProductSuccess} 
        />
        <TransactionTable
          transactions={transactions}
          
          />

      </TransactionContainer>
    </Layout>
  );
}
