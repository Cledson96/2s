import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
        tipo: {
          label: "tipo",
          type: "tipo",
          placeholder: "tipo",
        },
      },
      async authorize(credentials) {
        if (credentials.tipo === "login") {
          const user = await prisma.admin.findFirst({
            where: { email: credentials.email },
          });

          if (user) {
            const verifypassword = bcrypt.compareSync(
              credentials.password,
              user.senha
            );

            if (!verifypassword) {
              return null;
            }

            return {
              id: user.id,
              name: user.nome,
              email: user.email,
              image: user.foto,
            };
          } else {
            return null;
          }
        } else {
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
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await prisma.admin.findFirst({
        where: { email: session.user.email },
      });
      if (user) {
        session.dados = {
          permissao: user.administrador,
          ativo: user.ativo,
          user: session.user,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
