'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import WalletConnectButton from '@/components/WalletConnectButton'

const Page = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex h-full w-full flex-col items-center justify-center gap-[6px] bg-dark-brown p-[20px] backdrop-blur-md"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
      transition={{ duration: 1, delay: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={`relative flex h-screen w-full flex-col items-center justify-start overflow-hidden rounded-xl border border-white border-opacity-40 bg-[#2d2d2d9c] bg-opacity-40 bg-logged-out text-white backdrop-blur-xl`}
      >
        <div
          className={`flex w-full flex-row items-center justify-between px-10 py-5 z-50`}
        >
          <div className="flex items-center justify-start gap-4">
            <Link
              href="/"
              passHref
              className="flex flex-row items-center justify-center gap-4"
            >
              <Image
                src="/images/logo-transparent.png"
                alt="soladiator"
                width={100}
                height={100}
              />
              <h2 className="text-4xl font-bold font-akira uppercase">
                Soladiator
              </h2>
            </Link>
          </div>
          <div className="z-50 flex items-center justify-end gap-3">
            <Link
              href="https://twitter.com/soladiator"
              target="_blank"
              passHref
              className="flex w-[38px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff"
                className="hover:fill-light-orange"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </Link>
          </div>
        </div>
        <div
          className={`relative flex flex-col items-center justify-start gap-4`}
        >
          <h1 className={`text-8xl font-bold text-center`}>
            Enter the world of <br /> Soladiators!
          </h1>
          <div
            className={`relative mt-4 flex flex-col items-center justify-center gap-6 md:flex-row`}
          >
            <div className="relative flex flex-col items-center justify-center gap-2">
              <WalletConnectButton />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Page
