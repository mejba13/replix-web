"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Sparkles, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "How does Replix AI transform my content?",
    answer:
      "Simply paste your blog post, video URL, or upload a PDF. Our advanced AI analyzes the core message, extracts key insights, and automatically generates 30+ platform-optimized versions. Each output follows best practices for Twitter threads, LinkedIn posts, Instagram captions, YouTube descriptions, email newsletters, and more—all while maintaining your authentic voice.",
    category: "Getting Started",
  },
  {
    question: "What content formats can I repurpose?",
    answer:
      "Replix accepts multiple input formats: plain text, blog URLs (we extract the content automatically), YouTube videos (we transcribe and analyze), and PDF documents. Whether it's a 5,000-word whitepaper or a 30-minute podcast, our AI handles the heavy lifting of content extraction and intelligent repurposing.",
    category: "Input Formats",
  },
  {
    question: "Can I customize outputs to match my brand voice?",
    answer:
      "Absolutely! Our Brand Voice feature is a game-changer. Define your tone (professional, casual, witty), style guidelines, and even provide example content. The AI learns your unique voice and applies it consistently across all generated content. Your audience won't be able to tell it's AI-assisted.",
    category: "Customization",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes! Our free forever plan includes 10 repurpose jobs and 50 outputs per month—no credit card required. It's perfect for trying out the platform and seeing the quality of AI-generated content. When you're ready to scale, upgrade seamlessly to unlock unlimited potential.",
    category: "Pricing",
  },
  {
    question: "How accurate is the AI content generation?",
    answer:
      "Our AI is built on GPT-4 and trained specifically for content repurposing. It maintains factual accuracy from your source material while optimizing for each platform's unique requirements. You can review and edit any output before publishing, giving you complete control over the final content.",
    category: "Quality",
  },
  {
    question: "Can my team collaborate on content?",
    answer:
      "Replix is built for teams! Create workspaces with role-based access (Owner, Admin, Member, Viewer), set up approval workflows, and manage brand voices centrally. Pro and Enterprise plans support multiple team members with shared templates and content libraries.",
    category: "Teams",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-[120px] animate-float delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl mb-8"
          >
            <MessageCircleQuestion className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">FAQ</span>
          </motion.div>

          {/* Main heading with dramatic typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block text-foreground">Got Questions?</span>
              <span className="block mt-2 font-serif italic faq-gradient-text">
                We&apos;ve Got Answers.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to know about transforming your content strategy with AI
          </motion.p>
        </div>

        {/* FAQ Grid Layout */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FAQItem
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card/40 border border-border/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Still have questions?</p>
                <p className="text-sm text-muted-foreground">We&apos;re here to help</p>
              </div>
            </div>
            <a
              href="mailto:support@replix.ai"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  faq: {
    question: string;
    answer: string;
    category: string;
  };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl transition-all duration-500
        ${isOpen
          ? 'bg-card/60 border-primary/30 shadow-2xl shadow-primary/10'
          : 'bg-card/30 border-border/30 hover:bg-card/50 hover:border-border/50'
        }
        border backdrop-blur-xl
      `}
    >
      {/* Glow effect when open */}
      {isOpen && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-orange-500/5 pointer-events-none" />
      )}

      <button
        onClick={onToggle}
        className="w-full text-left p-6 sm:p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-5">
          {/* Number indicator */}
          <div
            className={`
              relative shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-bold
              transition-all duration-500
              ${isOpen
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                : 'bg-primary/10 text-primary group-hover:bg-primary/20'
              }
            `}
          >
            <span className="relative z-10">{String(index + 1).padStart(2, '0')}</span>
            {isOpen && (
              <div className="absolute inset-0 rounded-xl bg-primary animate-glow-ring" />
            )}
          </div>

          {/* Question content */}
          <div className="flex-1 min-w-0">
            {/* Category tag */}
            <span
              className={`
                inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 transition-colors duration-300
                ${isOpen
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground'
                }
              `}
            >
              {faq.category}
            </span>

            <h3
              className={`
                text-lg sm:text-xl font-semibold pr-8 transition-colors duration-300
                ${isOpen ? 'text-foreground' : 'text-foreground/90 group-hover:text-foreground'}
              `}
            >
              {faq.question}
            </h3>
          </div>

          {/* Toggle icon */}
          <div
            className={`
              shrink-0 w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-500
              ${isOpen
                ? 'bg-primary/20 text-primary rotate-0'
                : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
              }
            `}
          >
            {isOpen ? (
              <Minus className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </div>
        </div>
      </button>

      {/* Answer panel with animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-8 pt-0">
              <div className="pl-[68px]">
                <div className="h-px w-full bg-gradient-to-r from-primary/30 via-border/50 to-transparent mb-6" />
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FAQSection;
