import { Button } from "@/components/ui/button"
import { Plus, Settings, ExternalLink, BarChart3, Edit, Trash2, TrendingUp, Eye, MousePointer, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
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
    createdAt: "2024-12-01",
    trend: "+12%",
    trendDirection: "up"
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
    createdAt: "2024-11-28",
    trend: "+8%",
    trendDirection: "up"
  }
]

const quickStats = [
  {
    label: "Total Views",
    value: "2,139",
    change: "+12%",
    changeDirection: "up",
    icon: Eye,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    label: "Total Clicks",
    value: "245",
    change: "+8%",
    changeDirection: "up",
    icon: MousePointer,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    label: "Active Pages",
    value: "2",
    change: "All active",
    changeDirection: "neutral",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    label: "Click Rate",
    value: "11.5%",
    change: "+3.5%",
    changeDirection: "up",
    icon: BarChart3,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  }
]

export default function DashboardPage() {
  return (
    <div className="container max-w-7xl py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your pages.</p>
          </div>
          <Link href="/builder">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Create New Page
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-background p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1">
                {stat.changeDirection === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : stat.changeDirection === "down" ? (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                ) : null}
                <span className={`text-sm font-medium ${
                  stat.changeDirection === "up" ? "text-green-500" : 
                  stat.changeDirection === "down" ? "text-red-500" : 
                  "text-muted-foreground"
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Microsites List */}
      <div className="rounded-xl border bg-background overflow-hidden">
        <div className="p-6 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Pages</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last 30 days</span>
            </div>
          </div>
        </div>
        <div className="divide-y">
          {microsites.map((site) => (
            <div key={site.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="font-semibold text-lg">{site.name}</h3>
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full font-medium">
                      {site.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    @{site.username} • {site.template} template
                  </p>
                  <Link 
                    href={site.url} 
                    className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1 group"
                    target="_blank"
                  >
                    {site.url}
                    <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </Link>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="text-center">
                    <p className="font-semibold text-lg">{site.views.toLocaleString()}</p>
                    <p className="text-xs">views</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">{site.clicks.toLocaleString()}</p>
                    <p className="text-xs">clicks</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      {site.trendDirection === "up" ? (
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                      )}
                      <span className="text-xs font-medium text-green-500">{site.trend}</span>
                    </div>
                    <p className="text-xs">this week</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/builder">
                    <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/30">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Link href="/analytics">
                    <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-950/30">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950/30">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-xl border bg-background p-6">
        <h3 className="font-semibold mb-6 text-lg">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/builder">
            <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-3 w-full hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                <Plus className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-center">
                <span className="font-medium">Create New Page</span>
                <p className="text-xs text-muted-foreground mt-1">Start building your microsite</p>
              </div>
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-3 w-full hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors duration-300">
                <BarChart3 className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-center">
                <span className="font-medium">View Analytics</span>
                <p className="text-xs text-muted-foreground mt-1">Track your performance</p>
              </div>
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-3 w-full hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
                <Settings className="h-6 w-6 text-purple-500" />
              </div>
              <div className="text-center">
                <span className="font-medium">Account Settings</span>
                <p className="text-xs text-muted-foreground mt-1">Manage your preferences</p>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 