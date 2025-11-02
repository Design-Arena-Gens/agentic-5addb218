# AI Social Media Manager

Fully automated AI-powered social media management platform that discovers trending topics, generates content with AI, and posts automatically to multiple platforms.

## Features

### 1. Trending Discovery
- Fetch trending topics from multiple sources (Google Trends, Twitter, Reddit, YouTube)
- Filter by language (English, Urdu, Hindi, Arabic)
- Filter by region and category
- Manual approval system with scoring
- Real-time trend updates

### 2. AI Content Generation
- GPT-powered text generation with customizable tones
- AI image generation using Stable Diffusion (via Replicate)
- Multi-language support
- Platform-specific optimization

### 3. Post Scheduling & Automation
- Smart scheduling system
- Auto-post capability
- Multi-platform posting (Facebook, Instagram, Twitter/X, YouTube, Pinterest, Threads, LinkedIn)
- Post now or schedule for later

### 4. Analytics Dashboard
- Real-time statistics
- Weekly activity charts
- Platform performance metrics

### 5. Settings & Configuration
- API key management
- Platform toggles
- Posting interval configuration

## Getting Started

1. Install dependencies: npm install
2. Create .env file with your API keys
3. Run: npm run dev
4. Open http://localhost:3000

## Required APIs
- OpenAI (for GPT content generation)
- Replicate (for AI image generation)

See .env.example for configuration.
