# Replix - AI Content Repurposing Platform

<div align="center">

![Replix Logo](https://img.shields.io/badge/Replix-AI%20Content%20Repurposing-E53935?style=for-the-badge&logo=sparkles&logoColor=white)

**Transform One Post Into 30+ Viral Pieces**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](https://replix.app) | [Documentation](#documentation) | [Features](#features) | [Getting Started](#getting-started)

</div>

---

## Overview

**Replix** is an AI-powered content repurposing platform that transforms your blogs, videos, and podcasts into 30+ platform-optimized outputs. Save hours of content creation time while maintaining your unique brand voice across Twitter/X, LinkedIn, Instagram, YouTube, TikTok, and more.

<img width="1924" height="1434" alt="Relix-index" src="https://github.com/user-attachments/assets/9dca2dce-5197-4f16-b8cb-8d2f5c231573" />


### Why Replix?

- **10x Faster Content Creation** - What took hours now takes seconds
- **30+ Platform Formats** - Twitter threads, LinkedIn carousels, Instagram captions, YouTube scripts, and more
- **Brand Voice AI** - Train the AI on your unique style for authentic outputs
- **Multi-Tenant Workspaces** - Built for teams with roles and permissions

---

## Features

### Content Ingestion
- **Text Input** - Paste any content directly
- **URL Parsing** - Extract content from blog posts and articles
- **YouTube Transcripts** - Auto-extract from video links
- **PDF Upload** - Parse documents and reports

### AI-Powered Generation
- **Platform-Optimized** - Each output follows platform best practices
- **Tone Selection** - Professional, casual, witty, inspirational
- **Brand Voice** - Custom style guidelines and examples
- **Batch Processing** - Generate all platforms at once

### Output Management
- **Version History** - Track all edits and regenerations
- **Rich Editor** - Refine outputs with markdown support
- **One-Click Copy** - Export to clipboard instantly
- **Direct Scheduling** - Connect to social media tools

### Team Collaboration
- **Workspaces** - Organize by client or project
- **Role-Based Access** - Owner, Admin, Member, Viewer
- **Team Invitations** - Email-based onboarding
- **Approval Workflows** - Review before publishing

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + Shadcn/ui |
| **Database** | PostgreSQL + Prisma ORM |
| **Authentication** | NextAuth.js v5 (Auth.js) |
| **Payments** | Stripe Subscriptions |
| **AI** | OpenAI GPT-4 |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Stripe account (for billing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mejba13/replix-web.git
   cd replix-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/replix"

   # Authentication
   AUTH_SECRET="your-auth-secret-key"
   AUTH_GOOGLE_ID="your-google-client-id"
   AUTH_GOOGLE_SECRET="your-google-client-secret"

   # Stripe
   STRIPE_SECRET_KEY="sk_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   STRIPE_STARTER_PRICE_ID="price_..."
   STRIPE_PRO_PRICE_ID="price_..."

   # OpenAI
   OPENAI_API_KEY="sk-..."

   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
replix-web/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed templates
├── src/
│   ├── app/
│   │   ├── (marketing)/    # Landing page
│   │   ├── (auth)/         # Login, register
│   │   ├── (dashboard)/    # Protected dashboard
│   │   └── api/            # API routes
│   ├── components/
│   │   ├── ui/             # Shadcn components
│   │   ├── landing/        # Marketing components
│   │   └── dashboard/      # Dashboard components
│   ├── lib/                # Utilities & clients
│   ├── actions/            # Server actions
│   └── hooks/              # React hooks
└── public/                 # Static assets
```

---

## Pricing Plans

| Plan | Price | Jobs/Month | Outputs/Month |
|------|-------|------------|---------------|
| **Free** | $0 | 10 | 50 |
| **Starter** | $29/mo | 50 | 500 |
| **Pro** | $79/mo | 200 | 2,000 |
| **Enterprise** | Custom | Unlimited | Unlimited |

---

## Documentation

- [API Reference](docs/api.md)
- [Brand Voice Guide](docs/brand-voice.md)
- [Webhook Integration](docs/webhooks.md)
- [Self-Hosting Guide](docs/self-hosting.md)

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Developed By

<div align="center">

<img width="380" height="420" alt="engr-mejba-ahmed" src="https://github.com/user-attachments/assets/83e72c39-5eaa-428a-884b-cb4714332487" />


### **Engr Mejba Ahmed**

**AI Developer | Software Engineer | Entrepreneur**

[![Portfolio](https://img.shields.io/badge/Portfolio-mejba.me-10B981?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.mejba.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mejba)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mejba13)

</div>

---

## Hire / Work With Me

I build AI-powered applications, mobile apps, and enterprise solutions. Let's bring your ideas to life!

| Platform | Description | Link |
|----------|-------------|------|
| **Fiverr** | Custom builds, integrations, performance optimization | [fiverr.com/s/EgxYmWD](https://www.fiverr.com/s/EgxYmWD) |
| **Mejba Personal Portfolio** | Full portfolio & contact | [mejba.me](https://www.mejba.me) |
| **Ramlit Limited** | Software development company | [ramlit.com](https://www.ramlit.com) |
| **ColorPark Creative Agency** | UI/UX & creative solutions | [colorpark.io](https://www.colorpark.io) |
| **xCyberSecurity** | Global cybersecurity services | [xcybersecurity.io](https://www.xcybersecurity.io) |

---

<div align="center">

**Built with passion using Next.js, TypeScript, and AI**

[![Star on GitHub](https://img.shields.io/github/stars/mejba13/replix-web?style=social)](https://github.com/mejba13/replix-web)

</div>
