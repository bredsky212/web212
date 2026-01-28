import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { User as UserModel } from "@/models/User";

declare module "next-auth" {
    interface User {
        role?: string;
    }
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            role?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
        id?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                await dbConnect();

                const user = await UserModel.findOne({ email: credentials.email });

                if (!user) {
                    if (
                        credentials.email === process.env.ADMIN_EMAIL &&
                        credentials.password === process.env.ADMIN_PASSWORD
                    ) {
                        const hashedPassword = await bcrypt.hash(credentials.password, 12);
                        const newAdmin = await UserModel.create({
                            email: credentials.email,
                            password: hashedPassword,
                            name: "Admin",
                            role: "admin",
                        });
                        return {
                            id: newAdmin._id.toString(),
                            email: newAdmin.email,
                            name: newAdmin.name,
                            role: newAdmin.role,
                        };
                    }
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
