# Streamline Landing Page

A modern Next.js landing page built with Tailwind CSS and Radix UI components.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🧩 Radix UI components for accessibility
- 📱 Responsive design
- 🎥 Daily.co video integration
- 🔐 NextAuth authentication
- 📊 Analytics dashboard
- 🎯 Landing page builder
- 💰 Pricing pages
- 📝 Blog functionality

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Prisma with PostgreSQL
- **Authentication**: NextAuth.js
- **Video**: Daily.co
- **Deployment**: Vercel (recommended)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-new-repo-url>
   cd <your-project-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   DAILY_API_KEY="your-daily-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── pricing/           # Pricing pages
│   └── ...
├── components/            # Reusable components
│   └── ui/               # UI components
├── lib/                   # Utility functions
├── prisma/               # Database schema
└── public/               # Static assets
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details