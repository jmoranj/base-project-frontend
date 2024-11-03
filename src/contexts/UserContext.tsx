'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface UserContextType {
  userPhoto: string | null
  setUserPhoto: (photo: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userPhoto, setUserPhoto] = useState<string | null>(null)

  return (
    <UserContext.Provider value={{ userPhoto, setUserPhoto }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
