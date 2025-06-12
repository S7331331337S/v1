// Daily.co integration service
export interface DailyRoom {
  id: string
  name: string
  url: string
  privacy: 'public' | 'private'
  properties?: {
    exp?: number
    eject_at_room_exp?: boolean
    enable_chat?: boolean
    enable_recording?: 'cloud' | 'local' | 'off'
    start_video_off?: boolean
    start_audio_off?: boolean
    max_participants?: number
  }
}

export interface DailyMeeting {
  id: string
  room_name: string
  room_url: string
  created_at: string
  config: {
    exp: number
    privacy: 'public' | 'private'
    max_participants?: number
  }
}

class DailyCoService {
  public apiKey: string
  private baseUrl: string
  private domain: string

  constructor() {
    // Use the provided API key
    this.apiKey = '0adc7572de6e1944a204dd94d9a7ebcdb09cbba5a8bf458ef3cf1aa9a243fd3a'
    this.baseUrl = 'https://api.daily.co/v1'
    this.domain = 'mstrmnd.daily.co' // Using the domain from the user's Daily.co account
  }

  // Create a new video room
  async createRoom(roomName: string, options: Partial<DailyRoom['properties']> = {}): Promise<DailyRoom> {
    const response = await fetch(`${this.baseUrl}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        name: roomName,
        privacy: 'public',
        properties: {
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours from now
          eject_at_room_exp: true,
          enable_chat: true,
          enable_recording: 'cloud',
          start_video_off: false,
          start_audio_off: false,
          max_participants: 10,
          ...options
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Daily.co API Error:', response.status, errorText)
      throw new Error(`Failed to create Daily.co room: ${response.statusText}`)
    }

    return response.json()
  }

  // Get room information
  async getRoom(roomName: string): Promise<DailyRoom> {
    const response = await fetch(`${this.baseUrl}/rooms/${roomName}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to get Daily.co room: ${response.statusText}`)
    }

    return response.json()
  }

  // Delete a room
  async deleteRoom(roomName: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/rooms/${roomName}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to delete Daily.co room: ${response.statusText}`)
    }
  }

  // Get meeting token for a user
  async getMeetingToken(roomName: string, userName: string, isOwner: boolean = false): Promise<string> {
    const response = await fetch(`${this.baseUrl}/meeting-tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        room: roomName,
        user_name: userName,
        is_owner: isOwner,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour from now
        permissions: {
          can_send: true,
          can_admin: isOwner,
          can_recording: isOwner
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Failed to get meeting token: ${response.statusText}`)
    }

    const data = await response.json()
    return data.token
  }

  // Get room participants
  async getRoomParticipants(roomName: string): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/rooms/${roomName}/participants`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to get room participants: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data || []
  }

  // Generate room URL for different use cases
  generateRoomUrl(roomName: string, token?: string): string {
    const baseUrl = `https://${this.domain}/${roomName}`
    return token ? `${baseUrl}?t=${token}` : baseUrl
  }

  // Create a room for a video session
  async createVideoSessionRoom(sessionTitle: string, duration: number = 60): Promise<DailyRoom> {
    const roomName = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const expTime = Math.floor(Date.now() / 1000) + (duration * 60) // Convert minutes to seconds

    return this.createRoom(roomName, {
      exp: expTime,
      max_participants: 2, // 1:1 session
      enable_recording: 'cloud',
      start_video_off: false,
      start_audio_off: false
    })
  }

  // Create a room for a webinar
  async createWebinarRoom(webinarTitle: string, maxAttendees: number = 100): Promise<DailyRoom> {
    const roomName = `webinar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const expTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours

    return this.createRoom(roomName, {
      exp: expTime,
      max_participants: maxAttendees,
      enable_recording: 'cloud',
      start_video_off: true, // Attendees start with video off
      start_audio_off: true, // Attendees start with audio off
    })
  }

  // Test the API connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/rooms`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      })
      return response.ok
    } catch (error) {
      console.error('Daily.co connection test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const dailyCoService = new DailyCoService()

// Helper function to validate Daily.co configuration
export function validateDailyCoConfig(): boolean {
  return !!dailyCoService.apiKey
} 