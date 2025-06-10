import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="container space-y-8 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <div className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          <div className="flex items-center justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-2 border-background" />
                ))}
              </div>
              <span className="text-muted-foreground">Join 10,000+ creators</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-muted-foreground">4.9/5 rating</span>
            </div>
          </div>
          
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-6">
            Ready to Create Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Perfect Page</span>?
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Start building your professional link-in-bio page in minutes. 
            No coding required, just drag, drop, and publish.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg">
                Start Creating Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/examples">
              <Button variant="outline" size="lg" className="border-2 hover:bg-muted/50 transition-all duration-300 px-8 py-4 text-lg">
                <Zap className="mr-2 h-5 w-5" />
                View Examples
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
