import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In - Replix",
  description: "Sign in to your Replix account",
};

export default function LoginPage() {
  return <LoginForm />;
}
