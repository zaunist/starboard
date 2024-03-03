// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { useUserStore } from '../../../store';

export default NextAuth({
 providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
 ],
 callbacks: {
    signIn: async({  user }) => {
        if (user) {
            useUserStore.getState().setUsername(user.name);
          }

        return true;
      },
 }
});
