import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
        let user = null;

        const users = [
          { id: 1, email: "dzenisgudzevic18@gmail.com", password: "12345" },
        ];

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password);

        // logic to verify if the user exists
        user = users.find((user) => user.email === credentials.email);

        if (!user) {
          console.log("register");

          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with their profile data
        return user;
      },
    }),
    Google,
  ],
  callbacks: {
    async signIn({ account }) {
      if (account) {
        console.log(account);
      }
      return true;
    },
  },
});
