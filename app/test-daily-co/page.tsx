'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, Video, Play } from 'lucide-react'
import { dailyCoService } from '@/lib/daily-co'

export default function TestDailyCoPage() {
  const [isTesting, setIsTesting] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testDailyCoConnection = async () => {
    setIsTesting(true)
    setError(null)
    setTestResults(null)

    try {
      // Test 1: API Connection
      const connectionTest = await dailyCoService.testConnection()
      
      if (!connectionTest) {
        throw new Error('Failed to connect to Daily.co API')
      }

      // Test 2: Create a test room
      const testRoom = await dailyCoService.createVideoSessionRoom(
        'Test Session',
        30
      )

      // Test 3: Generate a meeting token
      const token = await dailyCoService.getMeetingToken(
        testRoom.name,
        'Test User',
        true
      )

      setTestResults({
        connection: true,
        roomCreated: true,
        tokenGenerated: true,
        room: testRoom,
        token: token,
        roomUrl: dailyCoService.generateRoomUrl(testRoom.name, token)
      })

    } catch (err: any) {
      setError(err.message || 'Test failed')
      console.error('Daily.co test error:', err)
    } finally {
      setIsTesting(false)
    }
  }

  const createTestVideoSession = async () => {
    try {
      const room = await dailyCoService.createVideoSessionRoom(
        'Demo Coaching Session',
        60
      )
      
      setTestResults(prev => ({
        ...prev,
        demoRoom: room,
        demoRoomUrl: dailyCoService.generateRoomUrl(room.name)
      }))
    } catch (err: any) {
      setError(err.message || 'Failed to create demo room')
    }
  }

  const createTestWebinar = async () => {
    try {
      const room = await dailyCoService.createWebinarRoom(
        'Demo Webinar',
        50
      )
      
      setTestResults(prev => ({
        ...prev,
        webinarRoom: room,
        webinarRoomUrl: dailyCoService.generateRoomUrl(room.name)
      }))
    } catch (err: any) {
      setError(err.message || 'Failed to create webinar room')
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Daily.co Integration Test</h1>
        <p className="text-muted-foreground">
          Test the Daily.co integration with your API key
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Test Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={testDailyCoConnection}
              disabled={isTesting}
              className="w-full"
            >
              {isTesting ? 'Testing...' : 'Test Daily.co Connection'}
            </Button>

            {testResults?.connection && (
              <>
                <Button
                  onClick={createTestVideoSession}
                  variant="outline"
                  className="w-full"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Create Test Video Session
                </Button>

                <Button
                  onClick={createTestWebinar}
                  variant="outline"
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Create Test Webinar
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-4">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {testResults && (
              <div className="space-y-4">
                {/* Connection Status */}
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">API Connection: Working</span>
                </div>

                {testResults.roomCreated && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <h4 className="font-medium text-green-800 mb-2">Test Room Created</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <p><strong>Room Name:</strong> {testResults.room.name}</p>
                      <p><strong>Room URL:</strong> {testResults.room.url}</p>
                      <p><strong>Expires:</strong> {new Date(testResults.room.properties?.exp * 1000).toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {testResults.tokenGenerated && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-medium text-blue-800 mb-2">Meeting Token Generated</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p><strong>Token:</strong> {testResults.token.substring(0, 20)}...</p>
                      <p><strong>Secure URL:</strong> {testResults.roomUrl}</p>
                    </div>
                  </div>
                )}

                {testResults.demoRoom && (
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                    <h4 className="font-medium text-purple-800 mb-2">Demo Video Session</h4>
                    <div className="text-sm text-purple-700 space-y-1">
                      <p><strong>Room:</strong> {testResults.demoRoom.name}</p>
                      <p><strong>URL:</strong> {testResults.demoRoomUrl}</p>
                      <Badge variant="outline" className="text-xs">60 min session</Badge>
                    </div>
                  </div>
                )}

                {testResults.webinarRoom && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
                    <h4 className="font-medium text-orange-800 mb-2">Demo Webinar</h4>
                    <div className="text-sm text-orange-700 space-y-1">
                      <p><strong>Room:</strong> {testResults.webinarRoom.name}</p>
                      <p><strong>URL:</strong> {testResults.webinarRoomUrl}</p>
                      <Badge variant="outline" className="text-xs">50 participants max</Badge>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Video className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium">Video Sessions</h4>
              <p className="text-sm text-muted-foreground">1:1 coaching sessions</p>
              <Badge variant="outline" className="mt-2">Ready</Badge>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <Play className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium">Webinars</h4>
              <p className="text-sm text-muted-foreground">Group presentations</p>
              <Badge variant="outline" className="mt-2">Ready</Badge>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">Recording</h4>
              <p className="text-sm text-muted-foreground">Cloud recording enabled</p>
              <Badge variant="outline" className="mt-2">Ready</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 