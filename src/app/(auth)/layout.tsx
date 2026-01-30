import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authentication - Replix",
  description: "Sign in or create an account to get started with Replix",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex relative bg-background">
      {/* Left side - Immersive Visual Panel */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] relative overflow-hidden">
        {/* Layered background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-float -translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] animate-float delay-500 translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

        {/* Noise texture */}
        <div className="absolute inset-0 noise" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-8 xl:p-12 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
                <span className="text-xl font-bold text-white">R</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-primary/40 blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-foreground">Replix</span>
          </Link>

          {/* Main content */}
          <div className="max-w-lg space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/60 border border-border/50 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-foreground/80">Trusted by 5,000+ content creators</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="text-foreground">Transform content into </span>
                <span className="auth-gradient-text font-serif italic">30+ platform-ready</span>
                <span className="text-foreground"> posts</span>
              </h1>
              <p className="text-lg xl:text-xl text-muted-foreground leading-relaxed max-w-md">
                Write once, publish everywhere. AI-powered content repurposing that saves hours of work.
              </p>
            </div>

            {/* Floating platform showcase */}
            <div className="relative h-48 xl:h-56">
              {/* Platform cards floating */}
              <div className="absolute top-0 left-0 auth-platform-card animate-float-slow" style={{ animationDelay: '0s' }}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/80 border border-border/50 backdrop-blur-xl shadow-2xl">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">LinkedIn Post</div>
                    <div className="text-xs text-muted-foreground">Professional tone</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 right-8 xl:right-16 auth-platform-card animate-float-slow" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/80 border border-border/50 backdrop-blur-xl shadow-2xl">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Twitter Thread</div>
                    <div className="text-xs text-muted-foreground">Viral format</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-12 auth-platform-card animate-float-slow" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/80 border border-border/50 backdrop-blur-xl shadow-2xl">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Instagram Caption</div>
                    <div className="text-xs text-muted-foreground">Engaging hooks</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 auth-platform-card animate-float-slow" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/80 border border-border/50 backdrop-blur-xl shadow-2xl">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">YouTube Script</div>
                    <div className="text-xs text-muted-foreground">SEO optimized</div>
                  </div>
                </div>
              </div>

              {/* Connecting lines effect */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                    <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 pt-4">
              {[
                { value: "30+", label: "Platforms" },
                { value: "10x", label: "Faster" },
                { value: "5k+", label: "Users" },
              ].map((stat) => (
                <div key={stat.label} className="group cursor-default">
                  <div className="text-3xl xl:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Replix. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Mobile gradient background */}
        <div className="lg:hidden absolute inset-0">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-orange-500/10 rounded-full blur-[80px]" />
        </div>

        {/* Mobile header */}
        <header className="lg:hidden relative z-10 p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
              <span className="text-lg font-bold text-white">R</span>
            </div>
            <span className="text-lg font-bold text-foreground">Replix</span>
          </Link>
        </header>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
          <div className="w-full max-w-[420px]">
            {children}
          </div>
        </div>

        {/* Mobile footer */}
        <footer className="lg:hidden relative z-10 p-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Replix. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
