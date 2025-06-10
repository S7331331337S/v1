import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Enhanced background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-purple-500/10 blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] bg-green-500/5 blur-[100px] animate-pulse" />
      </div>

      {/* Floating particles for visual interest */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '5s' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="scroll-smooth">
          <Hero />
          <Features />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
