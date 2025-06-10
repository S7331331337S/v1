import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ExternalLink, Heart, Share2, Instagram, Twitter, Youtube, Linkedin, Globe } from "lucide-react"

// Mock data - in real app this would come from your database
const mockMicrosites = {
  "sarahchen": {
    name: "Sarah Chen",
    username: "sarahchen",
    bio: "Digital creator and lifestyle blogger sharing tips on fashion, travel, and wellness ✨",
    avatar: "/avatars/sarah.jpg",
    template: "minimal",
    links: [
      { id: "1", title: "My Blog", url: "https://sarahchen.com", icon: Globe },
      { id: "2", title: "Instagram", url: "https://instagram.com/sarahchen", icon: Instagram },
      { id: "3", title: "YouTube", url: "https://youtube.com/@sarahchen", icon: Youtube },
      { id: "4", title: "Twitter", url: "https://twitter.com/sarahchen", icon: Twitter },
      { id: "5", title: "LinkedIn", url: "https://linkedin.com/in/sarahchen", icon: Linkedin }
    ],
    socials: [
      { type: "instagram", url: "https://instagram.com/sarahchen" },
      { type: "twitter", url: "https://twitter.com/sarahchen" },
      { type: "youtube", url: "https://youtube.com/@sarahchen" }
    ]
  },
  "techstart": {
    name: "TechStart Inc",
    username: "techstart",
    bio: "Innovative startup building the future of technology. Join us on our journey! 🚀",
    avatar: "/avatars/techstart.jpg",
    template: "business",
    links: [
      { id: "1", title: "Website", url: "https://techstart.com", icon: Globe },
      { id: "2", title: "Careers", url: "https://techstart.com/careers", icon: Globe },
      { id: "3", title: "LinkedIn", url: "https://linkedin.com/company/techstart", icon: Linkedin },
      { id: "4", title: "Twitter", url: "https://twitter.com/techstart", icon: Twitter }
    ],
    socials: [
      { type: "linkedin", url: "https://linkedin.com/company/techstart" },
      { type: "twitter", url: "https://twitter.com/techstart" }
    ]
  }
}

interface PageProps {
  params: Promise<{
    username: string
  }>
}

export default async function MicrositePage({ params }: PageProps) {
  const { username } = await params
  const microsite = mockMicrosites[username as keyof typeof mockMicrosites]

  if (!microsite) {
    notFound()
  }

  const getSocialIcon = (type: string) => {
    switch (type) {
      case "instagram": return Instagram
      case "twitter": return Twitter
      case "youtube": return Youtube
      case "linkedin": return Linkedin
      default: return Globe
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {microsite.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{microsite.name}</h1>
          <p className="text-muted-foreground mb-4">@{microsite.username}</p>
          <p className="text-sm leading-relaxed">{microsite.bio}</p>
        </div>

        {/* Links */}
        <div className="space-y-3 mb-8">
          {microsite.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className="flex items-center justify-center gap-3">
                <link.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium">{link.title}</span>
                <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>

        {/* Social Links */}
        {microsite.socials.length > 0 && (
          <div className="flex justify-center gap-4 mb-8">
            {microsite.socials.map((social, index) => {
              const Icon = getSocialIcon(social.type)
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-md transition-all duration-200"
                >
                  <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </a>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Powered by{" "}
            <a href="/" className="text-blue-500 hover:text-blue-600">
              LinkStream
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 