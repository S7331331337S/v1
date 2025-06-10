"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <span className="font-bold">LinkStream</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
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
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Create Page</Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4 text-sm font-medium">
              <Link 
                href="/templates" 
                className="transition-colors hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link 
                href="/examples" 
                className="transition-colors hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Examples
              </Link>
              <Link 
                href="/pricing" 
                className="transition-colors hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/blog" 
                className="transition-colors hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </nav>
            <div className="flex flex-col space-y-3 pt-4 border-t border-border/40">
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">
                  Create Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
