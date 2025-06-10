'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Video, Users, DollarSign, Link, CheckCircle, AlertCircle } from 'lucide-react'
import { dailyCoService, validateDailyCoConfig } from '@/lib/daily-co'

interface VideoSessionProps {
  onSave: (data: any) => void
  initialData?: any
}

export default function VideoSessionSection({ onSave, initialData }: VideoSessionProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '1:1 Coaching Session',
    description: initialData?.description || 'Book a personalized coaching session to accelerate your growth and achieve your goals.',
    duration: initialData?.duration || 60,
    price: initialData?.price || 150,
    currency: initialData?.currency || 'USD',
    maxParticipants: initialData?.maxParticipants || 1,
    availability: initialData?.availability || 'flexible',
    timezone: initialData?.timezone || 'UTC',
    meetingLink: initialData?.meetingLink || '',
    calendarIntegration: initialData?.calendarIntegration || true,
    roomUrl: initialData?.roomUrl || '',
    roomName: initialData?.roomName || '',
    ...initialData
  })

  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const [roomCreated, setRoomCreated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const createDailyRoom = async () => {
    if (!validateDailyCoConfig()) {
      setError('Daily.co API key not configured. Please add DAILY_API_KEY to your environment variables.')
      return
    }

    setIsCreatingRoom(true)
    setError(null)

    try {
      const room = await dailyCoService.createVideoSessionRoom(
        formData.title,
        formData.duration
      )

      setFormData(prev => ({
        ...prev,
        roomUrl: room.url,
        roomName: room.name,
        meetingLink: 'daily-co'
      }))

      setRoomCreated(true)
    } catch (err) {
      setError('Failed to create video room. Please try again.')
      console.error('Room creation error:', err)
    } finally {
      setIsCreatingRoom(false)
    }
  }

  const handleSave = () => {
    onSave(formData)
  }

  const isDailyCoConfigured = validateDailyCoConfig()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Video className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Video Session</h3>
        <Badge variant="secondary">Digital Product</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Session Details
            </CardTitle>
            <CardDescription>Configure your video session settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Session Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="1:1 Coaching Session"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe what participants can expect..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                  min={15}
                  max={480}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Participants</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => handleChange('maxParticipants', parseInt(e.target.value))}
                  min={1}
                  max={10}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Scheduling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing & Scheduling
            </CardTitle>
            <CardDescription>Set pricing and availability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                  min={0}
                  step={0.01}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
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

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <select
                id="availability"
                value={formData.availability}
                onChange={(e) => handleChange('availability', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Select availability"
              >
                <option value="flexible">Flexible Scheduling</option>
                <option value="fixed">Fixed Time Slots</option>
                <option value="instant">Instant Booking</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={formData.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Select timezone"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">GMT</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Video Platform Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Video Platform
            </CardTitle>
            <CardDescription>Set up your video meeting platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meetingLink">Meeting Platform</Label>
              <select
                id="meetingLink"
                value={formData.meetingLink}
                onChange={(e) => handleChange('meetingLink', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Select meeting platform"
              >
                <option value="">Select platform</option>
                <option value="daily-co">Daily.co (Recommended)</option>
                <option value="zoom">Zoom</option>
                <option value="google-meet">Google Meet</option>
                <option value="teams">Microsoft Teams</option>
                <option value="custom">Custom Link</option>
              </select>
            </div>

            {formData.meetingLink === 'daily-co' && (
              <div className="space-y-4">
                {!isDailyCoConfigured && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm">
                        <strong>Daily.co not configured:</strong> Add DAILY_API_KEY to your environment variables to enable automatic room creation.
                      </p>
                    </div>
                  </div>
                )}

                {isDailyCoConfigured && !roomCreated && (
                  <Button 
                    onClick={createDailyRoom} 
                    disabled={isCreatingRoom}
                    className="w-full"
                  >
                    {isCreatingRoom ? 'Creating Room...' : 'Create Daily.co Room'}
                  </Button>
                )}

                {roomCreated && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <div>
                        <p className="text-sm font-medium">Room Created Successfully!</p>
                        <p className="text-xs text-green-600 mt-1">
                          Room: {formData.roomName}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {formData.meetingLink === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="customUrl">Custom Meeting URL</Label>
                <Input
                  id="customUrl"
                  type="url"
                  placeholder="https://your-meeting-platform.com/room"
                  aria-label="Enter custom meeting URL"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="calendarIntegration"
                checked={formData.calendarIntegration}
                onChange={(e) => handleChange('calendarIntegration', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
                aria-label="Enable calendar integration"
              />
              <Label htmlFor="calendarIntegration">Enable Calendar Integration</Label>
            </div>

            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Features:</strong> Calendar sync, automated reminders, 
                timezone conversion, and payment processing will be available in the full version.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Preview
            </CardTitle>
            <CardDescription>How your session will appear</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
              <h4 className="font-semibold">{formData.title}</h4>
              <p className="text-sm text-muted-foreground">{formData.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formData.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {formData.maxParticipants} participant{formData.maxParticipants > 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {formData.price} {formData.currency}
                </span>
              </div>
              {roomCreated && (
                <div className="flex items-center gap-2 text-xs text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  <span>Video room ready</span>
                </div>
              )}
              <Button className="w-full" size="sm">
                Book Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Video Session
        </Button>
      </div>
    </div>
  )
} 