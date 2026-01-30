"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FAQSection } from "@/components/marketing/faq-section";
import {
  Check,
  Sparkles,
  Target,
  Globe,
  BarChart3,
  Clock,
  Shield,
  ArrowRight,
  Play,
  Users,
  Layers,
  Wand2,
  ChevronRight,
  Star,
  Zap,
  TrendingUp,
  MessageSquare,
  FileText
} from "lucide-react";

// Platform data with SVG icons for marquee
const platforms = [
  {
    name: "Twitter/X",
    color: "from-neutral-400 to-neutral-600",
    bgColor: "bg-neutral-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    name: "LinkedIn",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: "Instagram",
    color: "from-pink-500 to-purple-600",
    bgColor: "bg-pink-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    )
  },
  {
    name: "Facebook",
    color: "from-blue-600 to-blue-800",
    bgColor: "bg-blue-600/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: "TikTok",
    color: "from-pink-500 to-cyan-400",
    bgColor: "bg-pink-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    )
  },
  {
    name: "YouTube",
    color: "from-red-500 to-red-700",
    bgColor: "bg-red-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: "Blog",
    color: "from-emerald-400 to-emerald-600",
    bgColor: "bg-emerald-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    )
  },
  {
    name: "Email",
    color: "from-amber-400 to-amber-600",
    bgColor: "bg-amber-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    )
  },
  {
    name: "Newsletter",
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M21 8V7l-3 2-3-2v1l3 2 3-2zm1-5H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm8-6h-8V6h8v6z"/>
      </svg>
    )
  },
  {
    name: "Threads",
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.73 2.108-1.15 3.456-1.187 1.1-.03 2.12.117 3.063.432l.003-1.588c.003-.67.005-1.368-.062-2.043-.168-1.703-.86-2.486-2.463-2.787-.46-.087-.954-.124-1.468-.11-.944.025-1.853.238-2.543.6-.778.407-1.302.972-1.475 1.592l-1.965-.547c.28-1.016 1.028-1.882 2.165-2.508.973-.535 2.174-.86 3.456-.935h.36c.739 0 1.453.065 2.123.194 2.577.495 4.013 1.96 4.276 4.356.09.828.084 1.68.078 2.504v.052c0 .044 0 .088-.002.132l-.004.174c.466.27.886.61 1.246 1.023.78.896 1.185 2.085 1.17 3.435-.018 1.522-.576 2.91-1.614 4.014-1.31 1.393-3.225 2.227-5.695 2.478-.358.037-.723.055-1.088.055zm.092-8.53c-1.056.027-1.942.312-2.498.8-.477.42-.68.928-.653 1.425.032.584.343 1.12.874 1.465.56.363 1.3.54 2.078.497 1.092-.06 1.925-.453 2.477-1.168.464-.6.753-1.41.87-2.432-.923-.28-1.942-.43-3.034-.43-.038 0-.076 0-.114.002z"/>
      </svg>
    )
  },
  {
    name: "Reddit",
    color: "from-orange-500 to-orange-700",
    bgColor: "bg-orange-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    )
  },
  {
    name: "Medium",
    color: "from-gray-500 to-gray-700",
    bgColor: "bg-gray-500/10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    )
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Drop your content",
    description: "Paste text, URL, YouTube link, or upload a PDF. Our AI extracts and analyzes every insight.",
    icon: Target,
    visual: "📄",
  },
  {
    step: "02",
    title: "Choose your stage",
    description: "Select platforms, customize tone, and apply your brand voice settings in seconds.",
    icon: Layers,
    visual: "🎯",
  },
  {
    step: "03",
    title: "Watch the magic",
    description: "Get 30+ platform-optimized outputs instantly. Edit, refine, and publish everywhere.",
    icon: Wand2,
    visual: "✨",
  },
];

const features = [
  {
    title: "30+ Platform Formats",
    description: "From Twitter threads to LinkedIn carousels, YouTube scripts to email newsletters — all optimized.",
    icon: Globe,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Your Voice, Amplified",
    description: "Train AI on your unique style. Every output sounds authentically you, never generic.",
    icon: Users,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Performance Insights",
    description: "Track engagement across platforms. Learn what resonates and optimize your strategy.",
    icon: BarChart3,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "10x Faster Creation",
    description: "What took hours now takes minutes. Batch generate content at unprecedented scale.",
    icon: Clock,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Team Workflows",
    description: "Workspaces, roles, and approval workflows for content teams of any size.",
    icon: Users,
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    title: "Enterprise Security",
    description: "SOC 2 compliant infrastructure. Your content stays private and protected.",
    icon: Shield,
    gradient: "from-rose-500/20 to-red-500/20",
  },
];

const testimonials = [
  {
    quote: "Replix cut our content creation time by 80%. We went from posting 3x/week to 3x/day across all platforms.",
    author: "Sarah Chen",
    role: "Head of Marketing",
    company: "TechFlow",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "The brand voice feature is a game-changer. Every piece of content sounds like it came from our team.",
    author: "Marcus Johnson",
    role: "Content Director",
    company: "ScaleUp Media",
    avatar: "MJ",
    rating: 5,
  },
  {
    quote: "Finally, a tool that understands each platform's nuances. Our LinkedIn engagement increased 340%.",
    author: "Emily Rodriguez",
    role: "Founder",
    company: "GrowthLab",
    avatar: "ER",
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Perfect for trying out Replix",
    features: [
      "10 repurpose jobs/month",
      "50 outputs/month",
      "5 platforms",
      "Basic templates",
      "Email support",
    ],
    cta: "Start Free",
    popular: false,
    gradient: "from-gray-500/10 to-gray-600/10",
  },
  {
    name: "Starter",
    price: "29",
    period: "/month",
    description: "For solo creators",
    features: [
      "50 repurpose jobs/month",
      "500 outputs/month",
      "15 platforms",
      "Custom templates",
      "1 brand voice",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: false,
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    name: "Pro",
    price: "79",
    period: "/month",
    description: "For growing teams",
    features: [
      "200 repurpose jobs/month",
      "2000 outputs/month",
      "All platforms",
      "Unlimited templates",
      "5 brand voices",
      "5 team members",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
    gradient: "from-primary/20 to-orange-500/20",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large orgs",
    features: [
      "Unlimited everything",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "SSO & SAML",
      "Custom AI training",
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-purple-500/10 to-pink-500/10",
  },
];


const stats = [
  { value: "30+", label: "Platforms" },
  { value: "10x", label: "Faster" },
  { value: "5k+", label: "Creators" },
  { value: "1M+", label: "Outputs" },
];

// Hero output demo platforms with SVG icons
const heroPlatforms = [
  {
    name: "Twitter/X",
    color: "bg-neutral-500/20 text-neutral-300 border-neutral-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    name: "LinkedIn",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: "Instagram",
    color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    )
  },
  {
    name: "YouTube",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: "Email",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    )
  },
  {
    name: "Blog",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    )
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section - Cinematic Premium Design */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Layered Background Effects */}
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 noise" />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[200px] animate-float -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] animate-float delay-500 translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse -translate-x-1/2 -translate-y-1/2" />

        {/* Decorative Signal Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden lg:block">
          <div className="absolute inset-0 rounded-full border border-primary/10 animate-signal-pulse" />
          <div className="absolute inset-8 rounded-full border border-primary/10 animate-signal-pulse delay-200" />
          <div className="absolute inset-16 rounded-full border border-primary/10 animate-signal-pulse delay-400" />
        </div>

        {/* Main Content Container */}
        <div className="container relative z-10 min-h-screen flex flex-col justify-center py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left Column - Copy */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Trust Badge */}
              <div className="opacity-0 animate-slide-up-fade inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-primary/20 backdrop-blur-xl mb-8 group hover:border-primary/40 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-foreground/80">AI Content Repurposing Platform</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">NEW</span>
              </div>

              {/* Main Headline - SEO Optimized */}
              <h1 className="opacity-0 animate-slide-up-fade delay-100">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4">
                  Turn One Post Into
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic hero-gradient-text leading-[1.1]">
                  30+ Viral Pieces
                </span>
              </h1>

              {/* Value Proposition - SEO Rich */}
              <p className="opacity-0 animate-slide-up-fade delay-200 mt-8 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                <span className="text-foreground font-medium">Replix AI</span> transforms your blogs, videos, and podcasts into
                platform-perfect content for Twitter, LinkedIn, Instagram, YouTube, and more—
                <span className="text-foreground font-medium">in seconds, not hours</span>.
              </p>

              {/* Social Proof Inline */}
              <div className="opacity-0 animate-slide-up-fade delay-300 flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {["SC", "MJ", "ER", "AK", "JL"].map((initials, i) => (
                    <div
                      key={initials}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-orange-500/30 border-2 border-background flex items-center justify-center text-[10px] font-bold text-foreground/80"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="flex items-center gap-1">
                  <span className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </span>
                  <span className="ml-1 font-medium text-foreground">4.9/5</span>
                  <span className="text-muted-foreground">from 2,000+ creators</span>
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="opacity-0 animate-slide-up-fade delay-400 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-10">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-8 text-base font-semibold rounded-full group relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-red-500 to-orange-500 animate-gradient" />
                    <span className="relative flex items-center">
                      Start Repurposing Free
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-base font-medium rounded-full border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30 transition-all group">
                    <Play className="mr-2 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              {/* Micro Trust Signals */}
              <div className="opacity-0 animate-slide-up-fade delay-500 flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Free forever plan
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Setup in 30 seconds
                </span>
              </div>
            </div>

            {/* Right Column - Visual Demo */}
            <div className="relative order-1 lg:order-2">
              <div className="opacity-0 animate-slide-up-fade delay-200 relative">
                {/* Main Demo Card */}
                <div className="hero-card p-6 sm:p-8">
                  {/* Input Section */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground/70">Your Content</span>
                    </div>
                    <div className="relative rounded-xl bg-background/50 border border-border/30 p-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        &ldquo;Just launched our new AI-powered analytics dashboard.
                        It helps teams make data-driven decisions 10x faster with real-time insights...&rdquo;
                      </p>
                      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground/50">
                        Blog Post • 1,200 words
                      </div>
                    </div>
                  </div>

                  {/* Arrow / Transform Indicator */}
                  <div className="flex items-center justify-center my-4">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-glow-ring">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent" />
                    </div>
                  </div>

                  {/* Output Platforms Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-sm font-medium text-foreground/70">30+ Outputs Generated</span>
                      <span className="ml-auto text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                        Ready to publish
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {heroPlatforms.map((platform, index) => (
                        <div
                          key={platform.name}
                          className={`platform-pill flex items-center gap-2.5 ${platform.color} opacity-0 animate-fade-up`}
                          style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: 'forwards' }}
                        >
                          <span className="shrink-0">{platform.icon}</span>
                          <span className="truncate">{platform.name}</span>
                          <Check className="w-3.5 h-3.5 ml-auto shrink-0 text-emerald-400" />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/30 mt-4">
                      <span className="text-xs text-muted-foreground">+ 24 more platforms</span>
                      <Link href="/register" className="text-xs text-primary hover:underline font-medium flex items-center gap-1">
                        See all outputs
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -top-4 -right-4 opacity-0 animate-slide-up-fade delay-700">
                  <div className="glass rounded-xl px-4 py-3 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">10x</div>
                        <div className="text-xs text-muted-foreground">Faster Creation</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 opacity-0 animate-slide-up-fade delay-800">
                  <div className="glass rounded-xl px-4 py-3 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">1M+</div>
                        <div className="text-xs text-muted-foreground">Content Generated</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none hidden xl:block">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit">
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit-reverse">
                    <div className="w-2 h-2 rounded-full bg-orange-500/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="opacity-0 animate-slide-up-fade delay-700 mt-16 lg:mt-24">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 py-8 border-t border-border/20">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center opacity-0 animate-fade-up"
                  style={{ animationDelay: `${800 + index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-1000 hidden sm:flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-border/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Platform Marquee - Modern Design */}
      <section className="py-12 border-y border-border/20 bg-gradient-to-b from-card/50 to-background overflow-hidden relative">
        {/* Subtle gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Section header */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Publish Everywhere
          </p>
        </div>

        {/* Marquee container */}
        <div className="flex animate-marquee">
          {[...platforms, ...platforms].map((platform, index) => (
            <div
              key={`${platform.name}-${index}`}
              className="flex items-center gap-4 px-6 sm:px-10 shrink-0 group"
            >
              {/* Platform card */}
              <div className={`
                flex items-center gap-3 px-5 py-3 rounded-2xl
                ${platform.bgColor} border border-border/30
                backdrop-blur-sm transition-all duration-300
                group-hover:scale-105 group-hover:border-border/60
                group-hover:shadow-lg group-hover:shadow-primary/5
              `}>
                {/* Icon container */}
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  bg-gradient-to-br ${platform.color} text-white
                  shadow-lg transition-transform duration-300
                  group-hover:scale-110 group-hover:rotate-3
                `}>
                  {platform.icon}
                </div>

                {/* Platform name */}
                <span className="text-base font-semibold text-foreground/90 whitespace-nowrap">
                  {platform.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container relative">
          <div className="text-center mb-16 sm:mb-20">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-border/50">
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Three steps to{" "}
              <span className="font-serif italic text-primary">everywhere</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              From a single piece of content to a complete multi-platform strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className="group relative"
              >
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-gradient-to-r from-border via-border/50 to-transparent -translate-y-1/2 z-0" />
                )}

                <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5">
                  <CardContent className="p-8">
                    {/* Step number */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-6xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                        {item.step}
                      </span>
                      <span className="text-4xl">{item.visual}</span>
                    </div>

                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 sm:py-32 bg-card/30 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="container relative">
          <div className="text-center mb-16 sm:mb-20">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-border/50">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Everything you need to{" "}
              <span className="font-serif italic text-primary">scale</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Powerful features for modern content creators and marketing teams.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <CardContent className="relative p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container relative">
          <div className="text-center mb-16 sm:mb-20">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-border/50">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Loved by{" "}
              <span className="font-serif italic text-primary">creators</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Join thousands who&apos;ve transformed their content workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.author}
                className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                <CardContent className="p-6 sm:p-8">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <p className="text-foreground/90 leading-relaxed mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center text-sm font-semibold text-primary">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 sm:py-32 bg-card/30 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="container relative">
          <div className="text-center mb-16 sm:mb-20">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-border/50">
              Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Simple,{" "}
              <span className="font-serif italic text-primary">transparent</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Start free, upgrade when you need more. No hidden fees.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                  plan.popular ? "border-primary/50 shadow-xl shadow-primary/10" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-bl-lg">
                    Popular
                  </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50`} />
                <CardContent className="relative p-6 sm:p-8">
                  <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">
                      {plan.price === "Custom" ? "" : "$"}{plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                  <Link href="/register" className="block mb-6">
                    <Button
                      className={`w-full rounded-full ${plan.popular ? "" : "bg-secondary hover:bg-secondary/80"}`}
                      variant={plan.popular ? "default" : "secondary"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Ready to multiply your{" "}
              <span className="font-serif italic text-primary">content?</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join 5,000+ content creators who save 10+ hours every week.
              Start free, no credit card required.
            </p>
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 text-base font-medium rounded-full group animate-pulse-glow">
                Get Started Free
                <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
