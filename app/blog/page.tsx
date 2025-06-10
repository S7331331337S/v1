import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    title: "10 Tips for Creating the Perfect Link-in-Bio Page",
    excerpt: "Learn how to design a microsite that converts visitors into followers and customers.",
    author: "LinkStream Team",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Tips & Tricks"
  },
  {
    title: "The Future of Social Media Marketing",
    excerpt: "How link-in-bio pages are revolutionizing the way creators and businesses connect with their audience.",
    author: "Sarah Chen",
    date: "Dec 12, 2024",
    readTime: "8 min read",
    category: "Marketing"
  },
  {
    title: "Top 5 Templates for Fitness Influencers",
    excerpt: "Discover the best templates and layouts for fitness professionals and wellness coaches.",
    author: "Mike Rodriguez",
    date: "Dec 10, 2024",
    readTime: "4 min read",
    category: "Templates"
  }
]

export default function BlogPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground">Latest insights, tips, and stories from the LinkStream community</p>
      </div>

      <div className="space-y-8">
        {blogPosts.map((post, index) => (
          <article key={index} className="border-b border-border/50 pb-8 last:border-b-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded">
                {post.category}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
              {post.title}
            </h2>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {post.date}
              </div>
              <span>{post.readTime}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline">
          Load More Posts
        </Button>
      </div>
    </div>
  )
} 