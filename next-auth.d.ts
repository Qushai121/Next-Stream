import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"


declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
        role: string
    }
}

declare module "next-auth" {
    interface Session {
        user: DefaultUser & {
            role: string
        }
    }

}
