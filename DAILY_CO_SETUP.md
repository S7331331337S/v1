# Daily.co Integration Setup

## Overview
LinkStream now includes full Daily.co integration for video sessions and webinars. This allows creators to host professional video meetings directly from their link-in-bio pages.

## Features
- ✅ Automatic room creation for video sessions
- ✅ Webinar support with multiple participants
- ✅ Secure meeting tokens
- ✅ Recording capabilities
- ✅ Real-time participant management
- ✅ Professional video interface

## Setup Instructions

### 1. Get Your Daily.co API Key

1. Go to [Daily.co](https://daily.co) and create an account
2. Navigate to your dashboard
3. Go to "Developers" → "API Keys"
4. Create a new API key with the following permissions:
   - `rooms:write` - Create and manage rooms
   - `meeting-tokens:write` - Generate meeting tokens
   - `recordings:write` - Enable recording functionality

### 2. Configure Environment Variables

Add the following to your `.env` file:

```env
# Daily.co Integration
DAILY_API_KEY="0adc7572de6e1944a204dd94d9a7ebcdb09cbba5a8bf458ef3cf1aa9a243fd3ae"
```

### 3. Update Your Daily.co Domain

In `lib/daily-co.ts`, update the `generateRoomUrl` function to use your Daily.co domain:

```typescript
generateRoomUrl(roomName: string, token?: string): string {
  const baseUrl = `https:/mstrmnd.daily.co/${roomName}`
  return token ? `${baseUrl}?t=${token}` : baseUrl
}
```

Replace `your-domain` with your actual Daily.co domain.

### 4. Test the Integration

1. Start your development server: `pnpm dev`
2. Navigate to `/builder`
3. Go to the "Digital Products" tab
4. Add a "Video Session"
5. Select "Daily.co (Recommended)" as the meeting platform
6. Click "Create Daily.co Room"

## API Endpoints

The integration includes the following API endpoints:

### Create Room
```
POST /api/daily-co/rooms
Body: { roomName: string, options?: object }
```

### Get Room Info
```
GET /api/daily-co/rooms?roomName=string
```

### Generate Meeting Token
```
POST /api/daily-co/tokens
Body: { roomName: string, userName: string, isOwner?: boolean }
```

## Video Session Flow

1. **Creator creates a video session** in the builder
2. **System creates a Daily.co room** automatically
3. **Customer books the session** and pays
4. **System generates meeting tokens** for secure access
5. **Participants join** using the video room component
6. **Session is recorded** (if enabled) and stored

## Webinar Integration

For webinars, the system:
- Creates rooms with higher participant limits
- Starts participants with video/audio off
- Enables cloud recording
- Provides host controls for managing attendees

## Security Features

- **Meeting tokens** with expiration times
- **Room access control** based on payment status
- **Host permissions** for recording and moderation
- **Automatic room expiration** to prevent unauthorized access

## Troubleshooting

### Common Issues

1. **"Daily.co not configured" error**
   - Ensure `DAILY_API_KEY` is set in your `.env` file
   - Restart your development server

2. **"Failed to create room" error**
   - Check your API key permissions
   - Verify your Daily.co account is active
   - Check the browser console for detailed error messages

3. **Video not loading**
   - Ensure you're using HTTPS in production
   - Check browser permissions for camera/microphone
   - Verify Daily.co domain is correctly configured

### Support

For Daily.co specific issues:
- [Daily.co Documentation](https://docs.daily.co/)
- [Daily.co Support](https://daily.co/support)

For LinkStream integration issues:
- Check the browser console for error messages
- Verify all environment variables are set correctly
- Ensure you're using the latest version of the Daily.co SDK

## Production Deployment

When deploying to production:

1. **Set production API key** in your hosting environment
2. **Enable HTTPS** (required for video functionality)
3. **Configure CORS** if needed
4. **Set up monitoring** for video room usage
5. **Test with real users** before going live

## Cost Considerations

- Daily.co charges based on participant minutes
- Recording storage has additional costs
- Consider implementing usage limits for your users
- Monitor usage through the Daily.co dashboard

## Next Steps

1. **Payment Integration**: Connect with Stripe/PayPal for session booking
2. **Calendar Sync**: Integrate with Google Calendar/Outlook
3. **Analytics**: Track session metrics and engagement
4. **Automated Emails**: Send reminders and follow-ups
5. **Mobile App**: Consider mobile-specific video features 