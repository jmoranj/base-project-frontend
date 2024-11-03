import { NextPageContext } from 'next'
import ServerCookie from 'next-cookies'
import api from '@/api/api'

export default async function AuthReq(
  ctx: NextPageContext,
): Promise<string | null> {
  const { accessToken } = ServerCookie(ctx)
  console.log('AccessToken from cookies:', accessToken)

  if (!accessToken) return null

  try {
    await api.get('/users/validate-jwt', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    console.log('Token validated successfully')
    return `Bearer ${accessToken}`
  } catch (err) {
    console.error('Token validation error:', err)
    return null
  }
}
