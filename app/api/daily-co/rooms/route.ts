import { NextRequest, NextResponse } from 'next/server'
import { dailyCoService } from '@/lib/daily-co'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomName, options } = body

    if (!roomName) {
      return NextResponse.json(
        { error: 'Room name is required' },
        { status: 400 }
      )
    }

    const room = await dailyCoService.createRoom(roomName, options)
    
    return NextResponse.json(room)
  } catch (error) {
    console.error('Daily.co room creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roomName = searchParams.get('roomName')

    if (!roomName) {
      return NextResponse.json(
        { error: 'Room name is required' },
        { status: 400 }
      )
    }

    const room = await dailyCoService.getRoom(roomName)
    
    return NextResponse.json(room)
  } catch (error) {
    console.error('Daily.co room fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch room' },
      { status: 500 }
    )
  }
} 