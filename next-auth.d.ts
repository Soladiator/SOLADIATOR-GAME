import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      walletAddress: string
      username: string | null
      avatarURL: string | null
      createdAt: Date
    }
  }
}
