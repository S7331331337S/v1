import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Users, Heart, Eye } from "lucide-react"
import Link from "next/link"

const examples = [
  {
    name: "Sarah Chen",
    username: "@sarahchen",
    description: "Digital creator and lifestyle blogger",
    category: "Creator",
    stats: {
      followers: "125K",
      likes: "2.4K",
      views: "45K"
    },
    preview: "/examples/sarah-chen.jpg"
  },
  {
    name: "TechStart Inc",
    username: "@techstart",
    description: "Innovative startup building the future",
    category: "Business",
    stats: {
      followers: "12K",
      likes: "890",
      views: "8.2K"
    },
    preview: "/examples/techstart.jpg"
  },
  {
    name: "Mike Rodriguez",
    username: "@mikerodriguez",
    description: "Fitness coach and wellness expert",
    category: "Fitness",
    stats: {
      followers: "89K",
      likes: "1.8K",
      views: "32K"
    },
    preview: "/examples/mike-rodriguez.jpg"
  },
  {
    name: "Art Studio",
    username: "@artstudio",
    description: "Contemporary art gallery and studio",
    category: "Art",
    stats: {
      followers: "23K",
      likes: "1.2K",
      views: "15K"
    },
    preview: "/examples/art-studio.jpg"
  },
  {
    name: "Emma Wilson",
    username: "@emmawilson",
    description: "Travel photographer and adventurer",
    category: "Travel",
    stats: {
      followers: "67K",
      likes: "3.1K",
      views: "28K"
    },
    preview: "/examples/emma-wilson.jpg"
  },
  {
    name: "CodeCraft",
    username: "@codecraft",
    description: "Software development agency",
    category: "Tech",
    stats: {
      followers: "8.5K",
      likes: "456",
      views: "6.8K"
    },
    preview: "/examples/codecraft.jpg"
  }
]

export default function ExamplesPage() {
  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2">Real Examples</h1>
        <p className="text-muted-foreground">See how creators and businesses are using LinkStream to showcase their links</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example) => (
          <div key={example.username} className="group relative overflow-hidden rounded-lg border bg-background hover:shadow-lg transition-all">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">{example.name}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{example.name}</h3>
                <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded">
                  {example.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{example.username}</p>
              <p className="text-sm text-muted-foreground mb-4">{example.description}</p>
              
              <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {example.stats.followers}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {example.stats.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {example.stats.views}
                </div>
              </div>
              
              <Link href={`/${example.username}`} className="w-full">
                <Button className="w-full" size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Page
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 