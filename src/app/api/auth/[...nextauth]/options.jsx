import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const user = {
          id: 1,
          name: "cledsinho",
          email: "cledson1996@gmail.com",
          password: 123,
        };
        if (user && user.password == credentials.password) {
          // const user = await prisma.usuarios.findFirst({
          //   where: {
          //     email: credentials.email,
          //   },
          // });
          // if (user) {
          //   console.log(user);
          //   const verifypassword = bcrypt.compareSync(
          //     credentials.password,
          //     user?.senha
          //   );
          //   console.log(verifypassword);
          //   if (!verifypassword) {
          //     return null;
          //   }
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
