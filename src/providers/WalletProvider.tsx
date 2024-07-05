'use client'

import { FC, ReactNode, useCallback, useMemo } from 'react'
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'

import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui'

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const wallets = useMemo(() => [], [])

  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_CHAIN_CLUSTER!}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider
