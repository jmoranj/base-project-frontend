// pages/index.js
import { useEffect, useState } from "react";
import Layout from "@/components/Layaout";
import Title from "@/components/Title";
import TransactionTable from "@/components/TransactionTable";
import Balance from "@/components/Balance";
import TransactionContainer from "@/components/TransactionContainer";
import api from "./api/api";
import { Transaction } from "@/types/transactions";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/transactions');
        console.log(response.data);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <Layout>
      <TransactionContainer>
        <Title />
        <Balance
          transactions={transactions}
          isModalOpen={isModalOpen}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose} />
        <TransactionTable transactions={transactions} />
      </TransactionContainer>
    </Layout>
  );
}
