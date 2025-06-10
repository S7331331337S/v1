'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Video, Users, Clock, AlertCircle } from 'lucide-react'
import VideoRoom from '@/components/video-room'

interface VideoSessionData {
  id: string
  title: string
  description: string
  duration: number
  price: number
  currency: string
  roomUrl: string
  roomName: string
  hostName: string
  startTime?: string
  endTime?: string
}

export default function VideoSessionPage() {
  const params = useParams()
  const router = useRouter()
  const roomId = params.roomId as string

  const [sessionData, setSessionData] = useState<VideoSessionData | null>(null)
  const [userName, setUserName] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInCall, setIsInCall] = useState(false)

  // Mock session data - in real app, fetch from API
  useEffect(() => {
    // Simulate fetching session data
    const mockSession: VideoSessionData = {
      id: roomId,
      title: '1:1 Coaching Session',
      description: 'Personalized coaching session to help you achieve your goals.',
      duration: 60,
      price: 150,
      currency: 'USD',
      roomUrl: `https://mstrmnd.daily.co/${roomId}`,
      roomName: roomId,
      hostName: 'Coach Sarah',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString()
    }
    setSessionData(mockSession)
  }, [roomId])

  const joinSession = async () => {
    if (!userName.trim()) {
      setError('Please enter your name')
      return
    }

    setIsJoining(true)
    setError(null)

    try {
      // In a real app, you would:
      // 1. Validate the session exists
      // 2. Check if user has paid
      // 3. Generate meeting token
      // 4. Join the room

      // For demo, we'll simulate this
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsInCall(true)
    } catch (err) {
      setError('Failed to join session. Please try again.')
    } finally {
      setIsJoining(false)
    }
  }

  const leaveSession = () => {
    setIsInCall(false)
    router.push('/dashboard')
  }

  if (!sessionData) {
    return (
      <div className="container max-w-4xl py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading session...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isInCall) {
    return (
      <div className="container max-w-6xl py-4">
        <VideoRoom
          roomUrl={sessionData.roomUrl}
          roomName={sessionData.roomName}
          userName={userName}
          isHost={false}
          onLeave={leaveSession}
        />
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold mb-2">{sessionData.title}</h1>
        <p className="text-muted-foreground">{sessionData.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-blue-600" />
                Session Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Duration: {sessionData.duration} minutes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Host: {sessionData.hostName}
                  </span>
                </div>
              </div>

              {sessionData.startTime && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Session Time:</strong> {new Date(sessionData.startTime).toLocaleString()}
                  </p>
                </div>
              )}

              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  <strong>What to expect:</strong>
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Join 5 minutes before the scheduled time</li>
                  <li>• Ensure your camera and microphone are working</li>
                  <li>• Have your questions ready</li>
                  <li>• Find a quiet, well-lit environment</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Join Session */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Join Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="userName" className="text-sm font-medium">
                  Your Name
                </label>
                <input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="h-4 w-4" />
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              <Button
                onClick={joinSession}
                disabled={isJoining || !userName.trim()}
                className="w-full"
                size="lg"
              >
                {isJoining ? 'Joining...' : 'Join Video Session'}
              </Button>

              <div className="text-center">
                <Badge variant="outline" className="text-xs">
                  {sessionData.price} {sessionData.currency}
                </Badge>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  <strong>Ready to start:</strong> Your video session is ready to begin.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 