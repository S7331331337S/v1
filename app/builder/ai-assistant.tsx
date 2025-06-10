"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Sparkles, 
  Wand2, 
  Lightbulb, 
  Target, 
  TrendingUp,
  Users,
  Video,
  BookOpen,
  ShoppingCart,
  Calendar
} from "lucide-react"

interface AIAssistantProps {
  onGenerateContent: (content: any) => void
  creatorType: string
}

const creatorTypes = [
  { id: "influencer", name: "Influencer", icon: Users, description: "Build your personal brand" },
  { id: "educator", name: "Educator", icon: BookOpen, description: "Share knowledge and courses" },
  { id: "consultant", name: "Consultant", icon: Target, description: "Offer professional services" },
  { id: "artist", name: "Artist", icon: Sparkles, description: "Showcase your creative work" },
  { id: "entrepreneur", name: "Entrepreneur", icon: TrendingUp, description: "Grow your business" }
]

const aiSuggestions = {
  influencer: {
    bio: "Passionate content creator sharing lifestyle tips, fashion inspiration, and behind-the-scenes moments. Let's connect and build something amazing together! ✨",
    sections: ["About Me", "Latest Content", "Collaboration", "Social Links", "Fan Club"]
  },
  educator: {
    bio: "Dedicated educator helping students master new skills through engaging courses and personalized learning experiences. Knowledge is power! 📚",
    sections: ["Courses", "Free Resources", "1:1 Coaching", "Webinars", "Testimonials"]
  },
  consultant: {
    bio: "Strategic consultant helping businesses scale and achieve their goals. Let's transform your vision into reality with proven strategies. 💼",
    sections: ["Services", "Case Studies", "Book Consultation", "Resources", "Client Portal"]
  },
  artist: {
    bio: "Creative artist exploring the intersection of imagination and reality. Each piece tells a story - let's create something beautiful together. 🎨",
    sections: ["Portfolio", "Commission Work", "Art Prints", "Behind the Scenes", "Exhibitions"]
  },
  entrepreneur: {
    bio: "Serial entrepreneur building the future, one innovation at a time. From startups to scale-ups, I help businesses thrive in the digital age. 🚀",
    sections: ["Products", "Investor Relations", "Partnerships", "Media Kit", "Contact"]
  }
}

export default function AIAssistant({ onGenerateContent, creatorType }: AIAssistantProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [generatedContent, setGeneratedContent] = useState<any>(null)

  const generateContent = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const suggestions = aiSuggestions[creatorType as keyof typeof aiSuggestions] || aiSuggestions.influencer
    
    const content = {
      bio: suggestions.bio,
      sections: suggestions.sections.map((section, index) => ({
        id: `section-${index}`,
        type: section.toLowerCase().replace(/\s+/g, '-'),
        title: section,
        content: generateSectionContent(section, creatorType),
        order: index
      }))
    }
    
    setGeneratedContent(content)
    onGenerateContent(content)
    setIsGenerating(false)
  }

  const generateSectionContent = (section: string, type: string) => {
    const contentMap: any = {
      "About Me": {
        text: "Share your story, mission, and what makes you unique. Connect with your audience on a personal level.",
        cta: "Learn More"
      },
      "Latest Content": {
        text: "Showcase your most recent work, posts, or achievements to keep your audience engaged.",
        cta: "View All"
      },
      "Collaboration": {
        text: "Open the door to exciting partnership opportunities and brand collaborations.",
        cta: "Get in Touch"
      },
      "Courses": {
        text: "Transform your expertise into valuable learning experiences for your audience.",
        cta: "Enroll Now"
      },
      "1:1 Coaching": {
        text: "Offer personalized guidance and mentorship to help others achieve their goals.",
        cta: "Book Session"
      },
      "Services": {
        text: "Highlight your professional services and how you can help clients succeed.",
        cta: "Get Quote"
      },
      "Portfolio": {
        text: "Showcase your best work and creative projects in a visually stunning gallery.",
        cta: "View Gallery"
      },
      "Products": {
        text: "Feature your products, services, or digital offerings in an attractive storefront.",
        cta: "Shop Now"
      }
    }
    
    return contentMap[section] || {
      text: "Custom section content for your unique needs.",
      cta: "Learn More"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Content Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Creator Type</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {creatorTypes.map((type) => {
              const Icon = type.icon
              return (
                <div
                  key={type.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    creatorType === type.id 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onGenerateContent({ creatorType: type.id })}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{type.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <Label htmlFor="ai-input">Tell me about yourself (optional)</Label>
          <Textarea
            id="ai-input"
            placeholder="I'm a fitness coach who helps busy professionals stay healthy..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={3}
          />
        </div>

        <Button 
          onClick={generateContent} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Wand2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Content...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Content
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              ✨ AI Generated Content
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300 mb-3">
              {generatedContent.bio}
            </p>
            <div className="flex flex-wrap gap-2">
              {generatedContent.sections.map((section: any) => (
                <span
                  key={section.id}
                  className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded"
                >
                  {section.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 