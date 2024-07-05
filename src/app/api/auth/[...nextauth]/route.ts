import NextAuth from 'next-auth'
import nacl from 'tweetnacl'
import CredentialsProvider from 'next-auth/providers/credentials'
import bs58 from 'bs58'
import Joi from 'joi'
import DOMPurify from 'isomorphic-dompurify'
import { getUserByWallet } from '@/services/user.service'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Solana',
      credentials: {
        signData: {
          label: 'SignedData',
          type: 'text',
          placeholder: '0x0',
        },
        publicKey: {
          label: 'WalletAddress',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials: any, req: any) {
        try {
          const solanaWalletAddressSchema = Joi.string()
            .trim()
            .regex(/^([1-9A-HJ-NP-Za-km-z]{32,44})$/)
          const sanitizedInput = DOMPurify.sanitize(credentials?.publicKey)
          const { error } = solanaWalletAddressSchema.validate(sanitizedInput)
          if (error) return null

          const signData = new TextEncoder().encode(credentials?.signData)
          const publicKey = bs58.decode(credentials?.publicKey)
          const signature = bs58.decode(credentials?.signature)

          const isValid = nacl.sign.detached.verify(
            signData,
            signature,
            publicKey,
          )

          if (!isValid) return null

          const user = await getUserByWallet(credentials?.publicKey || '')

          return {
            id: user.walletAddress,
            ...user,
          }
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/', // Error code passed in query string as ?error=
    verifyRequest: '/', // (used for check email message)
    newUser: '/', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.user = user
      }

      return token
    },
    session: async ({ session, token }: any) => {
      session.user = token.user
      return session
    },
  },
})

export { handler as GET, handler as POST }
