import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Sparkles, Zap, Crown } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "1 microsite",
      "Basic templates",
      "Standard analytics",
      "LinkStream subdomain",
      "Basic support"
    ],
    buttonText: "Get Started",
    popular: false,
    icon: Sparkles
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For creators and small businesses",
    features: [
      "Unlimited microsites",
      "All templates",
      "Advanced analytics",
      "Custom domains",
      "Priority support",
      "Social media integration",
      "Email collection",
      "A/B testing"
    ],
    buttonText: "Start Free Trial",
    popular: true,
    icon: Zap
  },
  {
    name: "Business",
    price: "$29",
    period: "per month",
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "White-label options",
      "API access",
      "Advanced integrations",
      "Dedicated support",
      "Custom branding",
      "Bulk management"
    ],
    buttonText: "Contact Sales",
    popular: false,
    icon: Crown
  }
]

export default function PricingPage() {
  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground">Choose the plan that's right for you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative rounded-lg border bg-background p-6 ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <plan.icon className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
              variant={plan.popular ? 'default' : 'outline'}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          <div>
            <h3 className="font-medium mb-2">Can I change plans anytime?</h3>
            <p className="text-sm text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Do you offer refunds?</h3>
            <p className="text-sm text-muted-foreground">We offer a 30-day money-back guarantee on all paid plans.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">We accept all major credit cards, PayPal, and Apple Pay.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Is there a setup fee?</h3>
            <p className="text-sm text-muted-foreground">No setup fees. You only pay for the plan you choose.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 