import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { db } from "../../../lib/firebase";
import * as firestoreFunctions from "firebase/firestore";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  /* adapter: FirebaseAdapter({
    db,
    ...firestoreFunctions,
  }), */
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account.provider === "google") {
        //return profile.email_verified && profile.email.endsWith("ff@gmail.com");
        return autorizados(profile.email);
      }
    },
  },
});

const autorizados = (correo) => {
  const correos = [
    "retinalatinacine@gmail.com",
    "alegreiff@gmail.com",
    "cinebid.jaime@gmail.com",
  ];
  return correos.includes(correo);
};
