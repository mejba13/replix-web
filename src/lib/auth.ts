import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { User } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        token.name = session.name;
        token.image = session.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      // For OAuth providers, create a workspace if it's a new user
      if (account?.provider !== "credentials" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { workspaceMembers: true },
        });

        // If user exists but has no workspace, this will be handled in the afterAuth flow
        if (!existingUser) {
          // User will be created by the adapter, workspace creation happens after
        }
      }
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      // Create a default workspace for new users
      if (user.email && user.id) {
        const slug = user.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "-");
        const uniqueSlug = `${slug}-${Date.now().toString(36)}`;

        await prisma.workspace.create({
          data: {
            name: `${user.name || "My"}'s Workspace`,
            slug: uniqueSlug,
            members: {
              create: {
                userId: user.id,
                role: "OWNER",
              },
            },
            subscription: {
              create: {
                stripeCustomerId: `temp_${user.id}`, // Will be updated when Stripe customer is created
                plan: "FREE",
                status: "ACTIVE",
                jobsLimit: 10,
                outputsLimit: 50,
              },
            },
          },
        });
      }
    },
  },
});

// Helper function to get current user with workspace
export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      workspaceMembers: {
        include: {
          workspace: {
            include: {
              subscription: true,
            },
          },
        },
      },
    },
  });

  return user;
}

// Helper function to get user's workspaces
export async function getUserWorkspaces(userId: string) {
  return prisma.workspaceMember.findMany({
    where: { userId },
    include: {
      workspace: {
        include: {
          subscription: true,
          _count: {
            select: { members: true },
          },
        },
      },
    },
  });
}
