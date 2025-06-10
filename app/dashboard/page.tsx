import { Button } from "@/components/ui/button"
import { Plus, Settings, ExternalLink, BarChart3, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from your database
const microsites = [
  {
    id: "1",
    name: "Sarah's Links",
    username: "sarahchen",
    url: "https://linkstream.com/sarahchen",
    template: "Minimal",
    views: 1247,
    clicks: 89,
    status: "active",
    createdAt: "2024-12-01"
  },
  {
    id: "2", 
    name: "TechStart Official",
    username: "techstart",
    url: "https://linkstream.com/techstart",
    template: "Business",
    views: 892,
    clicks: 156,
    status: "active",
    createdAt: "2024-11-28"
  }
]

export default function DashboardPage() {
  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link href="/builder">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Page
            </Button>
          </Link>
        </div>
        <p className="text-muted-foreground">Manage your link-in-bio pages and track their performance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="rounded-lg border bg-background p-6">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Total Views</h3>
          </div>
          <p className="text-2xl font-bold">2,139</p>
          <p className="text-sm text-muted-foreground">+12% from last month</p>
        </div>
        <div className="rounded-lg border bg-background p-6">
          <div className="flex items-center gap-2 mb-2">
            <ExternalLink className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold">Total Clicks</h3>
          </div>
          <p className="text-2xl font-bold">245</p>
          <p className="text-sm text-muted-foreground">+8% from last month</p>
        </div>
        <div className="rounded-lg border bg-background p-6">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold">Active Pages</h3>
          </div>
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm text-muted-foreground">All pages active</p>
        </div>
        <div className="rounded-lg border bg-background p-6">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            <h3 className="font-semibold">Click Rate</h3>
          </div>
          <p className="text-2xl font-bold">11.5%</p>
          <p className="text-sm text-muted-foreground">Industry average: 8%</p>
        </div>
      </div>

      {/* Microsites List */}
      <div className="rounded-lg border bg-background">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Your Pages</h2>
        </div>
        <div className="divide-y">
          {microsites.map((site) => (
            <div key={site.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold">{site.name}</h3>
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded">
                      {site.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    @{site.username} • {site.template} template
                  </p>
                  <Link 
                    href={site.url} 
                    className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                    target="_blank"
                  >
                    {site.url}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="text-center">
                    <p className="font-semibold">{site.views}</p>
                    <p className="text-xs">views</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{site.clicks}</p>
                    <p className="text-xs">clicks</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/builder">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Link href="/analytics">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-lg border bg-background p-6">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/builder">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
              <Plus className="h-6 w-6" />
              <span>Create New Page</span>
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
              <BarChart3 className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
              <Settings className="h-6 w-6" />
              <span>Account Settings</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 