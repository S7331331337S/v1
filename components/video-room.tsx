'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Users, 
  Settings,
  Share,
  Square
} from 'lucide-react'

interface VideoRoomProps {
  roomUrl: string
  roomName: string
  userName: string
  isHost?: boolean
  onLeave?: () => void
}

export default function VideoRoom({ 
  roomUrl, 
  roomName, 
  userName, 
  isHost = false, 
  onLeave 
}: VideoRoomProps) {
  const videoRef = useRef<HTMLDivElement>(null)
  const [isJoined, setIsJoined] = useState(false)
  const [participants, setParticipants] = useState<any[]>([])
  const [localVideo, setLocalVideo] = useState(true)
  const [localAudio, setLocalAudio] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomUrl || !videoRef.current) return

    // Load Daily.co script dynamically
    const loadDailyScript = async () => {
      try {
        // Check if Daily.co is already loaded
        if (typeof window !== 'undefined' && (window as any).DailyIframe) {
          initializeRoom()
          return
        }

        // Load Daily.co script
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/@daily-co/daily-js'
        script.async = true
        script.onload = initializeRoom
        script.onerror = () => setError('Failed to load Daily.co')
        document.head.appendChild(script)
      } catch (err) {
        setError('Failed to initialize video room')
      }
    }

    loadDailyScript()

    return () => {
      // Cleanup
      if (typeof window !== 'undefined' && (window as any).DailyIframe) {
        const callFrame = (window as any).DailyIframe.createFrame(videoRef.current)
        callFrame.destroy()
      }
    }
  }, [roomUrl])

  const initializeRoom = () => {
    if (!videoRef.current || typeof window === 'undefined') return

    try {
      const DailyIframe = (window as any).DailyIframe
      const callFrame = DailyIframe.createFrame(videoRef.current, {
        iframeStyle: {
          width: '100%',
          height: '100%',
          border: '0',
          borderRadius: '8px',
        },
        showLeaveButton: true,
        showFullscreenButton: true,
      })

      // Set up event listeners
      callFrame.on('joined-meeting', () => {
        setIsJoined(true)
        console.log('Joined meeting')
      })

      callFrame.on('left-meeting', () => {
        setIsJoined(false)
        onLeave?.()
        console.log('Left meeting')
      })

      callFrame.on('participant-joined', (event: any) => {
        setParticipants(prev => [...prev, event.participant])
        console.log('Participant joined:', event.participant)
      })

      callFrame.on('participant-left', (event: any) => {
        setParticipants(prev => prev.filter(p => p.session_id !== event.participant.session_id))
        console.log('Participant left:', event.participant)
      })

      callFrame.on('recording-started', () => {
        setIsRecording(true)
        console.log('Recording started')
      })

      callFrame.on('recording-stopped', () => {
        setIsRecording(false)
        console.log('Recording stopped')
      })

      callFrame.on('error', (event: any) => {
        setError(`Video error: ${event.errorMsg}`)
        console.error('Video error:', event)
      })

      // Join the room
      callFrame.join({ url: roomUrl, userName })

      // Store callFrame for cleanup
      ;(window as any).currentCallFrame = callFrame
    } catch (err) {
      setError('Failed to initialize video room')
      console.error('Video room error:', err)
    }
  }

  const toggleVideo = () => {
    if (typeof window !== 'undefined' && (window as any).currentCallFrame) {
      const callFrame = (window as any).currentCallFrame
      if (localVideo) {
        callFrame.setLocalVideo(false)
        setLocalVideo(false)
      } else {
        callFrame.setLocalVideo(true)
        setLocalVideo(true)
      }
    }
  }

  const toggleAudio = () => {
    if (typeof window !== 'undefined' && (window as any).currentCallFrame) {
      const callFrame = (window as any).currentCallFrame
      if (localAudio) {
        callFrame.setLocalAudio(false)
        setLocalAudio(false)
      } else {
        callFrame.setLocalAudio(true)
        setLocalAudio(true)
      }
    }
  }

  const leaveCall = () => {
    if (typeof window !== 'undefined' && (window as any).currentCallFrame) {
      const callFrame = (window as any).currentCallFrame
      callFrame.leave()
    }
  }

  const toggleRecording = () => {
    if (typeof window !== 'undefined' && (window as any).currentCallFrame) {
      const callFrame = (window as any).currentCallFrame
      if (isRecording) {
        callFrame.stopRecording()
      } else {
        callFrame.startRecording()
      }
    }
  }

  const shareRoom = () => {
    if (navigator.share) {
      navigator.share({
        title: `Join ${roomName}`,
        url: roomUrl,
      })
    } else {
      navigator.clipboard.writeText(roomUrl)
      // You could add a toast notification here
    }
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-red-600">Video Room Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Room Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Video className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle className="text-lg">{roomName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {isJoined ? 'Connected' : 'Connecting...'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isHost ? "default" : "secondary"}>
                {isHost ? 'Host' : 'Participant'}
              </Badge>
              <Badge variant="outline">
                <Users className="h-3 w-3 mr-1" />
                {participants.length + 1}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Video Container */}
      <Card>
        <CardContent className="p-0">
          <div 
            ref={videoRef} 
            className="w-full h-96 bg-black rounded-lg overflow-hidden"
          />
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={localVideo ? "default" : "outline"}
              size="lg"
              onClick={toggleVideo}
              disabled={!isJoined}
            >
              {localVideo ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={localAudio ? "default" : "outline"}
              size="lg"
              onClick={toggleAudio}
              disabled={!isJoined}
            >
              {localAudio ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>

            {isHost && (
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="lg"
                onClick={toggleRecording}
                disabled={!isJoined}
              >
                <Square className="h-5 w-5" />
              </Button>
            )}

            <Button
              variant="outline"
              size="lg"
              onClick={shareRoom}
              disabled={!isJoined}
            >
              <Share className="h-5 w-5" />
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={leaveCall}
              disabled={!isJoined}
            >
              {isJoined ? <PhoneOff className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      {participants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-medium">{userName}</span>
                <Badge variant="outline" className="text-xs">You</Badge>
              </div>
              {participants.map((participant, index) => (
                <div key={participant.session_id || index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>{participant.user_name || 'Anonymous'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 