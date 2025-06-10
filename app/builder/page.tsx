"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Palette, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Plus,
  Trash2,
  GripVertical,
  Video,
  Play,
  Crown,
  ShoppingBag,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import VideoSessionSection from "./sections/video-session"
import WebinarSection from "./sections/webinar"
import MembershipSection from "./sections/membership"
import MerchSection from "./sections/merch"
import AIAssistant from "./ai-assistant"

interface LinkItem {
  id: string
  title: string
  url: string
  active: boolean
}

interface DigitalProduct {
  id: string
  type: 'video-session' | 'webinar' | 'membership' | 'merch'
  title: string
  data: any
  active: boolean
}

export default function BuilderPage() {
  const [pageData, setPageData] = useState({
    name: "My Links",
    username: "mylinks",
    bio: "Welcome to my page! 👋",
    avatar: "",
    template: "minimal"
  })

  const [links, setLinks] = useState<LinkItem[]>([
    { id: "1", title: "My Website", url: "https://example.com", active: true },
    { id: "2", title: "Instagram", url: "https://instagram.com/username", active: true },
    { id: "3", title: "Twitter", url: "https://twitter.com/username", active: true }
  ])

  const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>([])

  const [activeTab, setActiveTab] = useState("content")
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const addLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: "New Link",
      url: "https://",
      active: true
    }
    setLinks([...links, newLink])
  }

  const updateLink = (id: string, field: keyof LinkItem, value: string | boolean) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ))
  }

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id))
  }

  const toggleLink = (id: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, active: !link.active } : link
    ))
  }

  const addDigitalProduct = (type: DigitalProduct['type']) => {
    const newProduct: DigitalProduct = {
      id: Date.now().toString(),
      type,
      title: getDefaultTitle(type),
      data: {},
      active: true
    }
    setDigitalProducts([...digitalProducts, newProduct])
    setActiveSection(newProduct.id)
  }

  const getDefaultTitle = (type: DigitalProduct['type']) => {
    switch (type) {
      case 'video-session': return '1:1 Coaching Session'
      case 'webinar': return 'Masterclass Webinar'
      case 'membership': return 'Premium Membership'
      case 'merch': return 'Branded Merchandise'
      default: return 'Digital Product'
    }
  }

  const updateDigitalProduct = (id: string, data: any) => {
    setDigitalProducts(products => 
      products.map(product => 
        product.id === id ? { ...product, data, title: data.title || product.title } : product
      )
    )
  }

  const deleteDigitalProduct = (id: string) => {
    setDigitalProducts(products => products.filter(product => product.id !== id))
    setActiveSection(null)
  }

  const toggleDigitalProduct = (id: string) => {
    setDigitalProducts(products => 
      products.map(product => 
        product.id === id ? { ...product, active: !product.active } : product
      )
    )
  }

  const renderDigitalProductSection = (product: DigitalProduct) => {
    const commonProps = {
      onSave: (data: any) => updateDigitalProduct(product.id, data),
      initialData: product.data
    }

    switch (product.type) {
      case 'video-session':
        return <VideoSessionSection {...commonProps} />
      case 'webinar':
        return <WebinarSection {...commonProps} />
      case 'membership':
        return <MembershipSection {...commonProps} />
      case 'merch':
        return <MerchSection {...commonProps} />
      default:
        return null
    }
  }

  return (
    <div className="container max-w-7xl py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Page Builder</h1>
            <p className="text-muted-foreground">Create and customize your link-in-bio page with digital products</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save & Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Builder Panel */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="products">Digital Products</TabsTrigger>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Page Name</Label>
                      <Input 
                        id="name"
                        value={pageData.name}
                        onChange={(e) => setPageData({...pageData, name: e.target.value})}
                        placeholder="My Awesome Page"
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username"
                        value={pageData.username}
                        onChange={(e) => setPageData({...pageData, username: e.target.value})}
                        placeholder="username"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio"
                      value={pageData.bio}
                      onChange={(e) => setPageData({...pageData, bio: e.target.value})}
                      placeholder="Tell people about yourself..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5" />
                      Your Links
                    </span>
                    <Button onClick={addLink} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Link
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {links.map((link, index) => (
                      <div key={link.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <Input
                            value={link.title}
                            onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                            placeholder="Link title"
                          />
                          <Input
                            value={link.url}
                            onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                            placeholder="https://"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant={link.active ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleLink(link.id)}
                          >
                            {link.active ? "Active" : "Inactive"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteLink(link.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              {/* Digital Products Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Digital Products
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Add video sessions, webinars, memberships, and merchandise to monetize your audience
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => addDigitalProduct('video-session')}
                      className="h-24 flex flex-col items-center justify-center gap-2"
                    >
                      <Video className="h-6 w-6 text-blue-600" />
                      <span className="text-sm">Video Session</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => addDigitalProduct('webinar')}
                      className="h-24 flex flex-col items-center justify-center gap-2"
                    >
                      <Play className="h-6 w-6 text-purple-600" />
                      <span className="text-sm">Webinar</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => addDigitalProduct('membership')}
                      className="h-24 flex flex-col items-center justify-center gap-2"
                    >
                      <Crown className="h-6 w-6 text-yellow-600" />
                      <span className="text-sm">Membership</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => addDigitalProduct('merch')}
                      className="h-24 flex flex-col items-center justify-center gap-2"
                    >
                      <ShoppingBag className="h-6 w-6 text-green-600" />
                      <span className="text-sm">Merchandise</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Digital Products List */}
              {digitalProducts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Digital Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {digitalProducts.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {product.type === 'video-session' && <Video className="h-5 w-5 text-blue-600" />}
                              {product.type === 'webinar' && <Play className="h-5 w-5 text-purple-600" />}
                              {product.type === 'membership' && <Crown className="h-5 w-5 text-yellow-600" />}
                              {product.type === 'merch' && <ShoppingBag className="h-5 w-5 text-green-600" />}
                              <h4 className="font-medium">{product.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant={product.active ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleDigitalProduct(product.id)}
                              >
                                {product.active ? "Active" : "Inactive"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setActiveSection(activeSection === product.id ? null : product.id)}
                              >
                                {activeSection === product.id ? "Hide" : "Edit"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteDigitalProduct(product.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {activeSection === product.id && (
                            <div className="mt-4 pt-4 border-t">
                              {renderDigitalProductSection(product)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <AIAssistant 
                onApplySuggestion={(suggestion) => {
                  // Apply AI suggestions to the page
                  console.log('Applying AI suggestion:', suggestion)
                }}
              />
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Template & Styling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="template">Template</Label>
                      <select 
                        id="template"
                        className="w-full p-2 border rounded-md"
                        value={pageData.template}
                        onChange={(e) => setPageData({...pageData, template: e.target.value})}
                        title="Choose a template for your page"
                      >
                        <option value="minimal">Minimal</option>
                        <option value="creative">Creative</option>
                        <option value="business">Business</option>
                        <option value="gradient">Gradient</option>
                        <option value="dark">Dark</option>
                        <option value="vintage">Vintage</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <select 
                        id="theme" 
                        className="w-full p-2 border rounded-md"
                        title="Choose a theme for your page"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[9/16] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <LinkIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{pageData.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{pageData.bio}</p>
                  <div className="space-y-2">
                    {links.filter(link => link.active).map(link => (
                      <div key={link.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm">
                        {link.title}
                      </div>
                    ))}
                    {digitalProducts.filter(product => product.active).map(product => (
                      <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm flex items-center gap-2">
                        {product.type === 'video-session' && <Video className="h-4 w-4 text-blue-600" />}
                        {product.type === 'webinar' && <Play className="h-4 w-4 text-purple-600" />}
                        {product.type === 'membership' && <Crown className="h-4 w-4 text-yellow-600" />}
                        {product.type === 'merch' && <ShoppingBag className="h-4 w-4 text-green-600" />}
                        {product.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Your page will be available at:
                </p>
                <p className="text-sm font-mono text-blue-500">
                  linkstream.com/{pageData.username}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 