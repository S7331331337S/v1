import { NextRequest, NextResponse } from 'next/server'
import { dailyCoService } from '@/lib/daily-co'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomName, userName, isOwner } = body

    if (!roomName || !userName) {
      return NextResponse.json(
        { error: 'Room name and user name are required' },
        { status: 400 }
      )
    }

    const token = await dailyCoService.getMeetingToken(
      roomName, 
      userName, 
      isOwner || false
    )
    
    return NextResponse.json({ token })
  } catch (error) {
    console.error('Daily.co token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
} 