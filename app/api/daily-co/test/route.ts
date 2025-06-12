import { NextRequest, NextResponse } from 'next/server'
import { dailyCoService } from '@/lib/daily-co'

export async function GET(request: NextRequest) {
  try {
    // Test the Daily.co API connection
    const isConnected = await dailyCoService.testConnection()
    
    if (!isConnected) {
      return NextResponse.json(
        { success: false, error: 'Failed to connect to Daily.co API' },
        { status: 500 }
      )
    }
    
    // Create a test room
    const testRoom = await dailyCoService.createRoom(
      `test-${Date.now()}`,
      {
        exp: Math.floor(Date.now() / 1000) + (5 * 60), // 5 minutes from now
        max_participants: 2
      }
    )
    
    return NextResponse.json({
      success: true,
      message: 'Daily.co API connection successful',
      apiKey: dailyCoService.apiKey ? 'Configured' : 'Missing',
      testRoom
    })
  } catch (error: any) {
    console.error('Daily.co test error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to test Daily.co integration' },
      { status: 500 }
    )
  }
} 