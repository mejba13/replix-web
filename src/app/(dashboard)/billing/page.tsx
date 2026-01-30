import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Zap, ArrowUpRight } from "lucide-react";
import { PLANS, PlanKey } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your subscription and billing",
};

export default async function BillingPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  // Get user's workspace subscription
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    include: {
      workspace: {
        include: {
          subscription: true,
        },
      },
    },
  });

  if (!workspaceMember) {
    return null;
  }

  const subscription = workspaceMember.workspace.subscription;
  const currentPlan = (subscription?.plan || "FREE") as PlanKey;
  const planDetails = PLANS[currentPlan];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscription and payment settings
          </p>
        </div>
      </div>

      {/* Current Plan */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Current Plan: {planDetails.name}</CardTitle>
                <CardDescription>
                  {currentPlan === "FREE"
                    ? "You're on the free plan"
                    : `$${planDetails.price}/month`}
                </CardDescription>
              </div>
            </div>
            {currentPlan !== "FREE" && (
              <Button variant="outline">Manage Subscription</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Usage This Month</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Repurpose Jobs</span>
                    <span>
                      {subscription?.jobsUsedThisMonth || 0} /{" "}
                      {subscription?.jobsLimit === -1 ? "∞" : subscription?.jobsLimit || 10}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${Math.min(
                          ((subscription?.jobsUsedThisMonth || 0) / (subscription?.jobsLimit || 10)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Outputs Generated</span>
                    <span>
                      {subscription?.outputsUsedThisMonth || 0} /{" "}
                      {subscription?.outputsLimit === -1 ? "∞" : subscription?.outputsLimit || 50}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${Math.min(
                          ((subscription?.outputsUsedThisMonth || 0) / (subscription?.outputsLimit || 50)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Plan Features</h4>
              <ul className="space-y-2">
                {planDetails.features.slice(0, 5).map((feature: string) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Available Plans</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.entries(PLANS) as [PlanKey, typeof PLANS[PlanKey]][]).map(([key, plan]) => (
            <Card
              key={key}
              className={`border-border/50 ${
                key === currentPlan ? "border-primary" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  {key === currentPlan && (
                    <Badge className="bg-primary">Current</Badge>
                  )}
                </div>
                <div>
                  <span className="text-2xl font-bold">
                    {plan.price === null ? "Custom" : plan.price === 0 ? "Free" : `$${plan.price}`}
                  </span>
                  {plan.price !== null && plan.price > 0 && (
                    <span className="text-muted-foreground">/mo</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {plan.features.slice(0, 4).map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={key === currentPlan ? "outline" : "default"}
                  className="w-full"
                  disabled={key === currentPlan}
                >
                  {key === currentPlan
                    ? "Current Plan"
                    : key === "ENTERPRISE"
                    ? "Contact Sales"
                    : currentPlan === "FREE"
                    ? "Upgrade"
                    : (Object.keys(PLANS).indexOf(key) > Object.keys(PLANS).indexOf(currentPlan)
                    ? "Upgrade"
                    : "Downgrade")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>Manage your payment information</CardDescription>
        </CardHeader>
        <CardContent>
          {currentPlan === "FREE" ? (
            <p className="text-sm text-muted-foreground">
              No payment method required for the free plan. Upgrade to add a payment method.
            </p>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-card border border-border flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">•••• •••• •••• 4242</div>
                  <div className="text-sm text-muted-foreground">Expires 12/2025</div>
                </div>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Portal Link */}
      {currentPlan !== "FREE" && (
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Billing Portal</h3>
                <p className="text-sm text-muted-foreground">
                  View invoices, update payment info, and manage your subscription
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                Open Portal
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
