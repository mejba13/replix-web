"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthError } from "next-auth";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type AuthState = {
  error?: string;
  success?: boolean;
};

export async function register(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFields = registerSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "An account with this email already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create default workspace for the user
    const slug = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "-");
    const uniqueSlug = `${slug}-${Date.now().toString(36)}`;

    await prisma.workspace.create({
      data: {
        name: `${name}'s Workspace`,
        slug: uniqueSlug,
        members: {
          create: {
            userId: user.id,
            role: "OWNER",
          },
        },
        subscription: {
          create: {
            stripeCustomerId: `temp_${user.id}`,
            plan: "FREE",
            status: "ACTIVE",
            jobsLimit: 10,
            outputsLimit: 50,
          },
        },
      },
    });

    // Sign in the user
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Failed to sign in after registration" };
    }
    // If signIn throws a redirect, we should let it propagate
    throw error;
  }
}

export async function login(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFields = loginSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong. Please try again." };
      }
    }
    // If signIn throws a redirect, we should let it propagate
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
