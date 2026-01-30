"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        {/* Success state */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Check your email
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            We&apos;ve sent a password reset link to your email address.
            Please check your inbox and follow the instructions.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <button
              onClick={() => setSubmitted(false)}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              try again
            </button>
          </p>

          <Link href="/login" className="block">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border-border/60 bg-card/50 hover:bg-card transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Forgot password?
        </h1>
        <p className="text-muted-foreground">
          No worries, we&apos;ll send you reset instructions
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
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

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send reset link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </span>
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
