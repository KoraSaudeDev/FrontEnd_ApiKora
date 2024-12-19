// import { api } from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          const url = "http://10.27.254.153:81/"
          const response = await fetch(`${url}auth/login`, {
            method: "POST",
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (response.status !== 200) return null;
          const authData = await response.json();
          if (!authData.token) return null;

          (await cookies()).set("jwt", authData.token);
          return {
            id: "1",
            name: credentials.username,
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
