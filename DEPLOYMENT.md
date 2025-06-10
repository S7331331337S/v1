# Deployment Guide - LinkStream to Vercel

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set project name (e.g., "linkstream")
   - Confirm deployment settings

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Click "New Project"**

4. **Import your GitHub repository**

5. **Configure project settings**:
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `pnpm build` (or `npm run build`)
   - Output Directory: `.next` (default)

## Environment Variables Setup

After deployment, you'll need to add these environment variables in your Vercel dashboard:

### Required for Daily.co Integration:
```
DAILY_CO_API_KEY=your_daily_co_api_key_here
DAILY_CO_DOMAIN=your_daily_co_domain_here
```

### Optional (for future features):
```
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-domain.vercel.app
DATABASE_URL=your_database_url_here
```

## How to Add Environment Variables in Vercel:

1. Go to your project dashboard on Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add each variable:
   - **Name**: `DAILY_CO_API_KEY`
   - **Value**: Your Daily.co API key
   - **Environment**: Production (and Preview if needed)
5. Repeat for `DAILY_CO_DOMAIN`

## Post-Deployment Steps

1. **Test your deployment**:
   - Visit your Vercel URL
   - Test the main pages: `/`, `/builder`, `/dashboard`
   - Test the Daily.co integration at `/test-daily-co`

2. **Custom Domain** (Optional):
   - In Vercel dashboard, go to "Settings" → "Domains"
   - Add your custom domain
   - Update DNS records as instructed

3. **Share your project**:
   - Your app will be live at: `https://your-project-name.vercel.app`
   - Share this URL with others to test

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in `package.json`
2. **Environment variables not working**: Ensure they're added to Vercel dashboard
3. **Daily.co integration fails**: Verify API key and domain are correct

### Build Commands:
- **Development**: `pnpm dev`
- **Production Build**: `pnpm build`
- **Start Production**: `pnpm start`

## Next Steps After Deployment

1. **Set up authentication** (NextAuth.js)
2. **Add database** (PostgreSQL with Prisma)
3. **Configure payments** (Stripe)
4. **Add analytics** (Vercel Analytics)
5. **Set up monitoring** (Vercel Monitoring)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally first with `pnpm build`
4. Check the Vercel documentation

Your LinkStream app will be live and shareable once deployed! 🚀 