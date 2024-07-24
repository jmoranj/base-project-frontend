import Layout from "@/components/Layaout";
import Title from "@/components/Title";
import TransactionTable from "@/components/TransactionTable";
import Balance from "@/components/Balance";
import TransactionContainer from "@/components/TransactionContainer";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/transactions";

export default function Home() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const staticTransactions: Transaction[] = [
      {
        id: "1",
        description: "Óculos de sol",
        value: 36.00,
        date: new Date(2024, 6, 23),
        category: "Saida",
      },
    ];

    setTransactions(staticTransactions);
  }, []);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (<>
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

  </>
  );
}
