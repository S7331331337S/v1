import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <span className="font-bold">LinkStream</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/templates" className="transition-colors hover:text-primary">
            Templates
          </Link>
          <Link href="/examples" className="transition-colors hover:text-primary">
            Examples
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-primary">
            Pricing
          </Link>
          <Link href="/blog" className="transition-colors hover:text-primary">
            Blog
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Create Page</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
