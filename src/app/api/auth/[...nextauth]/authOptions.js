import loginUsers from "@/actions/auth/loginUsers";
import socialProviderUsers from "@/actions/auth/socialProviderUsers";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB, { collectionNames } from "@/lib/connectDB";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  providers: [
    // =================Email and Password Authentication======================
    CredentialsProvider({
      async authorize(credentials) {
        // console.log("=========Credentials property=======",credentials);
        try {
          const data = await loginUsers(credentials);
          if (data.user && data.status === "success") {
            return data.user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authentication failed", error);
          return null;
        }
      },
    }),
    // =========Google Authentication=============
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // console.log("==========users from signin callbacks==========",  user,account);
      if (account) {
        const { name, id, email } = user;
        const { provider, providerAccountId } = account;
        if (provider === "facebook") {
          user.image = "";
        }
        const payload = {
          name,
          email,
          image: user.image,
          provider,
          providerAccountId,
          role: "user",
          password: null,
          coverPhoto: "",
        };
        const valid = await socialProviderUsers(payload);
        if (valid.status === "failed") {
          return false;
        }
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      // console.log("user from JWT:", user);
      // console.log("token:", token);

      if (user) {
        if (user.provider === "credentials") {
          token.id = user._id.toString();
        }
        else{
          const usersCollection = connectDB(collectionNames.USERS);
          const socialProviderUser = await usersCollection.findOne({providerAccountId: user.id});
          token.id = socialProviderUser._id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};
