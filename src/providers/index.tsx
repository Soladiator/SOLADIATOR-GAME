'use client'
import React from 'react'
import WalletContextProvider from './WalletProvider'
import AuthProvider from './AuthProvider'
import { SessionProvider } from 'next-auth/react'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <WalletContextProvider>
        <AuthProvider>{children}</AuthProvider>
      </WalletContextProvider>
    </SessionProvider>
  )
}

export default Providers
