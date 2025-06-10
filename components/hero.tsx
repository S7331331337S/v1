import { Button } from "@/components/ui/button"
import { ArrowRight, Link as LinkIcon, Sparkles, Star, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full animate-ping" />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" />
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
      </div>

      <div className="space-y-6">
        {/* Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">The Ultimate Link-in-Bio Platform</span>
          </div>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            One Link,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Infinite Possibilities
            </span>
          </h1>
          <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Create stunning microsites that showcase all your important links in one beautiful, customizable page. 
            Perfect for creators, influencers, and businesses.
          </p>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-2 border-background" />
              ))}
            </div>
            <span>10,000+ creators trust us</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>4.9/5 rating</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Create Your Page
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/examples">
            <Button variant="outline" size="lg" className="border-2 hover:bg-muted/50 transition-all duration-300">
              <Zap className="mr-2 h-4 w-4" />
              View Examples
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Free to start</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Setup in 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
