# CLAUDE.md - Replix Web

This file provides guidance for Claude Code when working with this repository.

## Project Overview

Replix is a content repurposing SaaS application that transforms one piece of content into 30+ platform-optimized outputs using AI. The application supports multi-tenant workspaces with team collaboration.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with Server Actions
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v5 (Auth.js) with credentials and OAuth
- **Payments**: Stripe subscriptions
- **AI**: OpenAI GPT-4
- **UI**: Tailwind CSS + Shadcn/ui
- **Architecture**: Multi-tenant workspaces with team support

## Project Structure

```
replix-web/
├── prisma/
│   └── schema.prisma         # Database schema
├── src/
│   ├── app/
│   │   ├── (marketing)/      # Landing page (public)
│   │   ├── (auth)/           # Login, register, forgot password
│   │   ├── (dashboard)/      # Protected dashboard pages
│   │   └── api/              # API routes (auth, webhooks, ai)
│   ├── components/
│   │   ├── ui/               # Shadcn base components
│   │   ├── auth/             # Auth forms
│   │   ├── dashboard/        # Dashboard layout components
│   │   └── ...
│   ├── lib/                  # Prisma, auth, stripe, openai clients
│   ├── actions/              # Server actions
│   ├── hooks/                # React hooks (workspace context)
│   └── services/             # Business logic
```

## Build & Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# View database in Prisma Studio
npx prisma studio
```

## Database Setup

1. Start a PostgreSQL database (local or hosted)
2. Copy `.env.example` to `.env` and set DATABASE_URL
3. Run `npx prisma migrate dev` to create tables
4. Run `npx prisma generate` to generate the client

## Design System

- **Primary**: #E53935 (red)
- **Background**: #0A0A0A (dark)
- **Surface**: #1E1E1E
- **Border**: #2A2A2A
- **Theme**: Dark mode by default

## Key Features

1. **Content Ingestion**: Text, URL, YouTube, PDF
2. **Multi-Platform Output**: 30+ platforms
3. **Brand Voice**: Custom tone and style configuration
4. **Team Workspaces**: Roles (Owner/Admin/Member/Viewer)
5. **Usage Tracking**: Job and output limits per plan

## Authentication Flow

- Uses NextAuth.js v5 with JWT strategy
- Supports email/password and Google OAuth
- Protected routes via middleware
- Workspace created automatically for new users
