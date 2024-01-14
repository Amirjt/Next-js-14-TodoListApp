import connectToDb from "@/lib/db";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            async authorize(credentials : any) {
                const { email, password } = credentials
                await connectToDb()
                try {
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new Error("Invalid credentials")
                    }
                    const valid = await bcrypt.compare(password, user.password)
                    if (!valid) {
                        throw new Error("Wrong Email or Password")
                    } else {
                        return user
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        } as any)
    ],
    pages: {
        error: "/login"
    }
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }