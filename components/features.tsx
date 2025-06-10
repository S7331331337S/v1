import { Palette, Zap, Smartphone, BarChart3, Shield, Sparkles } from "lucide-react"

const features = [
  {
    name: "Beautiful Templates",
    description: "Choose from dozens of stunning, customizable templates designed for every niche and style.",
    icon: Palette,
  },
  {
    name: "Lightning Fast",
    description: "Create your microsite in minutes with our intuitive drag-and-drop editor.",
    icon: Zap,
  },
  {
    name: "Mobile Optimized",
    description: "Every page looks perfect on all devices - desktop, tablet, and mobile.",
    icon: Smartphone,
  },
  {
    name: "Analytics Dashboard",
    description: "Track clicks, views, and engagement with detailed analytics and insights.",
    icon: BarChart3,
  },
  {
    name: "Custom Domains",
    description: "Use your own domain or get a free subdomain with our premium plans.",
    icon: Shield,
  },
  {
    name: "Social Integration",
    description: "Seamlessly integrate with all your social media platforms and tools.",
    icon: Sparkles,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Everything You Need</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Powerful features to help you create the perfect link-in-bio page for your brand.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
