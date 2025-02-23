/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      randomKey: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    randomKey: string;
  }
}
