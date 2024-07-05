'use client'
import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import bs58 from 'bs58'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { SpinningLogo } from '@/components/SpinningLogo'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import mainMap from '../../public/images/main-map.webp'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const wallet = useWallet()
  const session = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isSigningIn, setIsSigningIn] = useState(false)

  console.log('session', session)

  useEffect(() => {
    const signInWallet = async () => {
      if (!wallet.publicKey || !wallet.signMessage) return false

      const signData = 'Sign in: ' + Date.now()
      const data = new TextEncoder().encode(signData)
      setIsSigningIn(true)
      const signature = await wallet.signMessage!(data)

      const res = await signIn('credentials', {
        signData: signData,
        signature: bs58.encode(signature),
        publicKey: wallet.publicKey!.toBase58(),
        redirect: false,
      })
      if (res?.error) {
        console.error(res.error)
      }
      setIsSigningIn(false)
    }

    if (wallet.publicKey && wallet.signMessage && !isSigningIn) {
      signInWallet()
    }
  }, [wallet.publicKey])

  useEffect(() => {
    if (session.status === 'authenticated' && !wallet.publicKey) {
      signOut()
    }
  }, [session.status, wallet.publicKey])

  if (session.status === 'loading' || isSigningIn) {
    return (
      <div className="relative h-screen w-screen text-white">
        <Image
          layout="fill"
          className="object-center object-cover pointer-events-none"
          src={mainMap}
          alt="Map"
        />
        <div className="w-full h-full inset-0 absolute z-[1] bg-black bg-opacity-60"></div>
        <div className="relative z-[2] w-full h-full">
          <div
            className="flex flex-col items-center justify-center h-full"
            style={{ gap: '1rem' }}
          >
            <SpinningLogo size="200px" />
            <div>
              <h3 style={{ fontSize: '50px', fontWeight: 700 }}>
                We are checking your status...
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (
    session.status === 'unauthenticated' ||
    wallet.publicKey === null
  ) {
    if (pathname !== '/login') {
      router.push('/login')
      return null
    }
  } else if (session.status === 'authenticated') {
    if (pathname === '/login') {
      router.push('/')
      return null
    }
  }
  return <>{children}</>
}

export default AuthProvider
