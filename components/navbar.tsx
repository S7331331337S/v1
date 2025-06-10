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
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">LinkStream</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/templates" className="transition-colors hover:text-primary relative group">
            Templates
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/examples" className="transition-colors hover:text-primary relative group">
            Examples
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-primary relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/blog" className="transition-colors hover:text-primary relative group">
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="hover:bg-muted/50">
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Create Page
            </Button>
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
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
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
