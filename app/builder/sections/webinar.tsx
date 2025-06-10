'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Video, Users, DollarSign, Link, Play } from 'lucide-react'

interface WebinarProps {
  onSave: (data: any) => void
  initialData?: any
}

export default function WebinarSection({ onSave, initialData }: WebinarProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || 'Masterclass: Building Your Online Business',
    description: initialData?.description || 'Join this comprehensive webinar to learn the fundamentals of building and scaling your online business.',
    date: initialData?.date || '',
    time: initialData?.time || '',
    duration: initialData?.duration || 90,
    price: initialData?.price || 49,
    currency: initialData?.currency || 'USD',
    maxAttendees: initialData?.maxAttendees || 100,
    isLive: initialData?.isLive || true,
    hasRecording: initialData?.hasRecording || true,
    meetingPlatform: initialData?.meetingPlatform || 'zoom',
    ...initialData
  })

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    onSave(formData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Play className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Webinar</h3>
        <Badge variant="secondary">Digital Product</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Webinar Details
            </CardTitle>
            <CardDescription>Configure your webinar settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webinar-title">Webinar Title</Label>
              <Input
                id="webinar-title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Masterclass: Building Your Online Business"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webinar-description">Description</Label>
              <Textarea
                id="webinar-description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe what attendees will learn..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="webinar-duration">Duration (minutes)</Label>
                <Input
                  id="webinar-duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                  min={30}
                  max={480}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webinar-max-attendees">Max Attendees</Label>
                <Input
                  id="webinar-max-attendees"
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) => handleChange('maxAttendees', parseInt(e.target.value))}
                  min={10}
                  max={1000}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scheduling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Scheduling
            </CardTitle>
            <CardDescription>Set date and time for your webinar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webinar-date">Date</Label>
              <Input
                id="webinar-date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webinar-time">Time</Label>
              <Input
                id="webinar-time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webinar-type">Webinar Type</Label>
              <select
                id="webinar-type"
                value={formData.isLive ? 'live' : 'recorded'}
                onChange={(e) => handleChange('isLive', e.target.value === 'live')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Select webinar type"
              >
                <option value="live">Live Webinar</option>
                <option value="recorded">Recorded Webinar</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="webinar-recording"
                checked={formData.hasRecording}
                onChange={(e) => handleChange('hasRecording', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
                aria-label="Include recording access"
              />
              <Label htmlFor="webinar-recording">Include Recording Access</Label>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing
            </CardTitle>
            <CardDescription>Set pricing for your webinar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="webinar-price">Price</Label>
                <Input
                  id="webinar-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                  min={0}
                  step={0.01}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webinar-currency">Currency</Label>
                <select
                  id="webinar-currency"
                  value={formData.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Select currency"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Features:</strong> Payment processing, automated emails, 
                and attendee management will be available in the full version.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Platform Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Platform Integration
            </CardTitle>
            <CardDescription>Connect with webinar platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webinar-platform">Meeting Platform</Label>
              <select
                id="webinar-platform"
                value={formData.meetingPlatform}
                onChange={(e) => handleChange('meetingPlatform', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Select meeting platform"
              >
                <option value="zoom">Zoom</option>
                <option value="webex">Cisco Webex</option>
                <option value="gotomeeting">GoToMeeting</option>
                <option value="teams">Microsoft Teams</option>
                <option value="custom">Custom Platform</option>
              </select>
            </div>

            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Features:</strong> Automatic platform integration, 
                meeting link generation, and attendee management will be available in the full version.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Preview
            </CardTitle>
            <CardDescription>How your webinar will appear</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
              <h4 className="font-semibold">{formData.title}</h4>
              <p className="text-sm text-muted-foreground">{formData.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formData.date || 'TBD'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formData.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {formData.maxAttendees} max
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {formData.price} {formData.currency}
                </span>
              </div>
              <Button className="w-full" size="sm">
                Register for Webinar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
          Save Webinar
        </Button>
      </div>
    </div>
  )
} 