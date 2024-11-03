// pages/protectedPage.js
import { useEffect, useState } from 'react'
import api from '../../api/api'
import AuthReq from '../../utils/auth-req'
import { NextPageContext } from 'next'

const ProtectedPage = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/transactions')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Protected Page</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  )
}

ProtectedPage.getInitialProps = async (ctx: NextPageContext) => {
  const authHeader = await AuthReq(ctx)
  if (!authHeader) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else {
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
  }
  return {}
}

export default ProtectedPage
