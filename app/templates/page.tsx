import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

const templates = [
  {
    name: "Minimal",
    description: "Clean and simple design for professionals",
    category: "Professional",
    image: "/templates/minimal.jpg"
  },
  {
    name: "Creative",
    description: "Bold and colorful for creators and influencers",
    category: "Creative",
    image: "/templates/creative.jpg"
  },
  {
    name: "Business",
    description: "Professional layout for businesses and entrepreneurs",
    category: "Business",
    image: "/templates/business.jpg"
  },
  {
    name: "Gradient",
    description: "Modern gradient design with smooth animations",
    category: "Modern",
    image: "/templates/gradient.jpg"
  },
  {
    name: "Dark",
    description: "Elegant dark theme with neon accents",
    category: "Modern",
    image: "/templates/dark.jpg"
  },
  {
    name: "Vintage",
    description: "Retro-inspired design with classic typography",
    category: "Creative",
    image: "/templates/vintage.jpg"
  }
]

export default function TemplatesPage() {
  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-blue-500" />
          <h1 className="text-3xl font-bold">Templates</h1>
        </div>
        <p className="text-muted-foreground">Choose from our collection of beautiful, customizable templates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.name} className="group relative overflow-hidden rounded-lg border bg-background hover:shadow-lg transition-all">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">{template.name}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{template.name}</h3>
                <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded">
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              <Button className="w-full" size="sm">
                Use Template
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 