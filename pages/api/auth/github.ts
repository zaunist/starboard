// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { useUserStore } from '../../../store';

export default NextAuth({
 providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
 ],
 callbacks: {
    async session({ session, token, user }) {
        if (user) {
            useUserStore.getState().setUsername(user.name);
          }
        return session;
      },
 }
});
