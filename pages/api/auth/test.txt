import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      /* scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly", */

      /* authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code", */
    }),
  ],

  jwt: {
    encryption: true,
  },
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account.provider === "google") {
        //return profile.email_verified && profile.email.endsWith("ff@gmail.com");
        //return [account, profile];
        //return user, profile, account;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt(token, account, user) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token, user;
    },
    redirect: async (url, _baseUrl) => {
      if (url === "/user") {
        return Promise.resolve("/");
      }
      return Promise.resolve("/");
    },
  },
  events: {
    async signIn(message) {
      //console.log("BACKEND AIGN IN ", message);
      /* on successful sign in */
      return message;
    },
    async signOut(message) {
      /* on signout */
    },
    async createUser(message) {
      /* user created */
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
    },
    async session(message) {
      //console.log("SESSSxION", message);
    },
    async error(message) {
      /* error in authentication flow */
    },
  },
});
