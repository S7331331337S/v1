import { Button } from "@/components/ui/button"
import { ArrowRight, Link as LinkIcon, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-blue-500" />
          <span className="text-sm font-medium text-blue-500">The Ultimate Link-in-Bio Platform</span>
        </div>
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          One Link,
          <br />
          Infinite Possibilities
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Create stunning microsites that showcase all your important links in one beautiful, customizable page. 
          Perfect for creators, influencers, and businesses.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button size="lg">
            Create Your Page
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/examples">
          <Button variant="outline" size="lg">
            View Examples
          </Button>
        </Link>
      </div>
    </section>
  )
}
