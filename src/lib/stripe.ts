import Stripe from "stripe";

// Lazy initialization to avoid build errors
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
}

// Export for backwards compatibility (use getStripe() in server actions)
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : (null as unknown as Stripe);

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    jobsLimit: 10,
    outputsLimit: 50,
    features: [
      "10 repurpose jobs/month",
      "50 outputs/month",
      "5 platforms",
      "Basic templates",
      "Email support",
    ],
  },
  STARTER: {
    name: "Starter",
    price: 29,
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
    jobsLimit: 50,
    outputsLimit: 500,
    features: [
      "50 repurpose jobs/month",
      "500 outputs/month",
      "15 platforms",
      "Custom templates",
      "Brand voice (1)",
      "Priority support",
    ],
  },
  PRO: {
    name: "Pro",
    price: 79,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    jobsLimit: 200,
    outputsLimit: 2000,
    features: [
      "200 repurpose jobs/month",
      "2000 outputs/month",
      "All platforms",
      "Unlimited templates",
      "Brand voices (5)",
      "Team members (5)",
      "API access",
      "Priority support",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: null, // Custom pricing
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    jobsLimit: -1, // Unlimited
    outputsLimit: -1, // Unlimited
    features: [
      "Unlimited jobs",
      "Unlimited outputs",
      "All platforms",
      "Unlimited templates",
      "Unlimited brand voices",
      "Unlimited team members",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export default stripe;
