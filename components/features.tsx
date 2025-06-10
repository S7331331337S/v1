import { Palette, Zap, Smartphone, BarChart3, Shield, Sparkles, Globe, Heart, Clock, Users } from "lucide-react"

const features = [
  {
    name: "Beautiful Templates",
    description: "Choose from dozens of stunning, customizable templates designed for every niche and style. Perfect for creators, businesses, and personal brands.",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  },
  {
    name: "Lightning Fast Setup",
    description: "Create your microsite in minutes with our intuitive drag-and-drop editor. No coding skills required - just drag, drop, and publish.",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20"
  },
  {
    name: "Mobile Optimized",
    description: "Every page looks perfect on all devices - desktop, tablet, and mobile. Responsive design ensures your links work everywhere.",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    name: "Analytics Dashboard",
    description: "Track clicks, views, and engagement with detailed analytics and insights. Understand your audience and optimize your content.",
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20"
  },
  {
    name: "Custom Domains",
    description: "Use your own domain or get a free subdomain with our premium plans. Build your brand with a professional web address.",
    icon: Globe,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20"
  },
  {
    name: "Social Integration",
    description: "Seamlessly integrate with all your social media platforms and tools. Connect your Instagram, TikTok, YouTube, and more.",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20"
  },
]

const stats = [
  { label: "Templates", value: "50+", icon: Palette },
  { label: "Active Users", value: "10K+", icon: Users },
  { label: "Setup Time", value: "<2min", icon: Clock },
  { label: "Satisfaction", value: "99%", icon: Heart },
]

export default function Features() {
  return (
    <section className="container space-y-20 py-24 md:py-32">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="flex items-center justify-center mb-2">
              <stat.icon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Header */}
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
          Everything You Need to
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Succeed</span>
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Powerful features to help you create the perfect link-in-bio page for your brand.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div 
            key={feature.name} 
            className={`group relative overflow-hidden rounded-xl border ${feature.borderColor} ${feature.bgColor} p-8 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-opacity-40`}
          >
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg">{feature.name}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="mx-auto max-w-2xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of creators who are already using our platform to grow their audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Creating Now
            </button>
            <button className="px-8 py-3 border-2 border-muted-foreground/20 text-foreground rounded-lg font-medium hover:bg-muted/50 transition-all duration-300">
              View All Templates
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
