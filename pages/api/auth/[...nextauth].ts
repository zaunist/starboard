// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";


export default NextAuth({
 providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
 ],
 callbacks: {
  async jwt({ token, account, profile }) {
    // Persist the OAuth access_token and or the user id to the token right after signin
    if (account) {
      token.accessToken = account.access_token
    }
    return token
  }
}
});
