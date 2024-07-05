'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false },
)

export default function WalletConnectButton() {
  return (
    <div
      className={`px-10 border uppercase text-2xl text-akira font-bold py-2 rounded-md border-primary bg-light-orange text-white flex items-center justify-center cursor-pointer`}
    >
      <WalletMultiButtonDynamic className="wallet" />
    </div>
  )
}
