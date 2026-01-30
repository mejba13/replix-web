import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account - Replix",
  description: "Create your Replix account and start repurposing content",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
