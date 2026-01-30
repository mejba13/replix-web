"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { register, loginWithGoogle, AuthState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Check } from "lucide-react";
import { useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full h-12 text-base font-semibold rounded-xl relative overflow-hidden group bg-primary hover:bg-primary/90"
      disabled={pending}
    >
      <span className="relative flex items-center justify-center gap-2">
        {pending ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <span>Create account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </span>
    </Button>
  );
}

function GoogleButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="outline"
      className="w-full h-12 text-base font-medium rounded-xl border-border/60 bg-card/50 hover:bg-card hover:border-border transition-all group"
      disabled={pending}
    >
      <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      <span>Continue with Google</span>
    </Button>
  );
}

const freePlanFeatures = [
  "10 repurpose jobs/month",
  "50 AI outputs",
  "5 platforms",
];

export function RegisterForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(register, {});
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Create an account
        </h1>
        <p className="text-muted-foreground">
          Get started with Replix for free
        </p>
      </div>

      {/* Free plan features */}
      <div className="flex flex-wrap gap-2">
        {freePlanFeatures.map((feature) => (
          <div
            key={feature}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400"
          >
            <Check className="w-3 h-3" />
            {feature}
          </div>
        ))}
      </div>

      {/* Google Sign Up */}
      <form action={loginWithGoogle}>
        <GoogleButton />
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-background">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Email Form */}
      <form action={formAction} className="space-y-4">
        {state?.error && (
          <div className="flex items-center gap-3 p-4 text-sm bg-destructive/10 border border-destructive/20 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-destructive shrink-0" />
            <p className="text-destructive">{state.error}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full name
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/50" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              autoComplete="name"
              className="h-12 pl-11 rounded-xl border-border/60 bg-card/30 focus:bg-card/60 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/50" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              autoComplete="email"
              className="h-12 pl-11 rounded-xl border-border/60 bg-card/30 focus:bg-card/60 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/50" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              required
              autoComplete="new-password"
              className="h-12 pl-11 pr-11 rounded-xl border-border/60 bg-card/30 focus:bg-card/60 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-[18px] h-[18px]" />
              ) : (
                <Eye className="w-[18px] h-[18px]" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters with uppercase, lowercase, and number
          </p>
        </div>

        <div className="pt-1">
          <SubmitButton />
        </div>
      </form>

      {/* Footer */}
      <div className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
            Sign in
          </Link>
        </p>

        <p className="text-center text-xs text-muted-foreground leading-relaxed">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
