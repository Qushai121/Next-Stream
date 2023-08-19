import prisma from "@/server/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/Google"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";






export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Sign in",
            // ini itu bikin form mirip di laravel filament
            credentials: {
                name: {
                    label: "name", type: "text", placeholder: "example",
                },
                password: {
                    label: "password", type: "password", placeholder: "password",
                },
                email: {
                    label: "email", type: "email", placeholder: "example@gmail.com",
                },

            },
            async authorize(credentials) {

                // check to see if email and password is there
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password')
                }

                // check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                    select: {
                        id: true,
                        email: true,
                        hashedPassword: true,
                        role: true
                    }
                });

                // if no user was found 
                if (!user || !user?.hashedPassword) {
                    throw new Error('No user found')
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }

                const userReq = {
                    id: user.id.toString(),
                    email: user.email,
                    password: user.hashedPassword,
                    role: user.role,
                }

                return userReq;
            }
        })
    ],

    session: {
        strategy: 'jwt'
    },

    callbacks: {
        async session({ token, session }) {
            if (token) {

                // console.log({ session: session, token: token });
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.image = token.image as string;
            }
            
            // console.log({ session: session});
            return session;
        },
        async jwt({ token, user }) {

            // console.log({ jwt: token, user: user });
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: token.email as string,
                },
            });
            
            if (!dbUser) {
                if (user) {
                    token.id = user?.id;
                }
                return token;
            }
            
            // console.log({ jwt: token, user: user });
            return {
                id: dbUser.id.toString(),
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role,
                image: dbUser.image,
            };
        },
    },
    secret: process.env.NEXTAUTH_SECRET,

    // debug: process.env.NODE_ENV === "development",
}