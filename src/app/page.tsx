'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { NextPageContext } from 'next'

import Layout from '@/components/layout/Layout'
import Title from '@/components/layout/Title'
import TransactionTable from '@/components/products/productContent/TransactionTable'
import Balance from '@/components/layout/Balance'
import TransactionContainer from '@/components/products/TransactionContainer'
import api from '../api/api'
import { Transaction } from '@/types/transactions'
import AuthReq from '../utils/auth-req'

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuthentication = async () => {
      const authHeader = await AuthReq({} as NextPageContext)
      if (!authHeader) {
        router.push('/login')
      } else {
        fetchTransactions()
      }
    }

    const fetchTransactions = async () => {
      try {
        const response = await api.get('/transactions')
        setTransactions(response.data)
      } catch (error) {
        console.error('Error fetching transactions', error)
      }
    }

    checkAuthentication()
  }, [router])

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  const handleAddProductSuccess = () => {
    fetchTransactions()
  }

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions')
      setTransactions(response.data)
    } catch (error) {
      console.error('Error fetching transactions', error)
    }
  }

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
        <TransactionTable transactions={transactions} />
      </TransactionContainer>
    </Layout>
  )
}
