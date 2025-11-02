// Simulated in-memory storage for demo purposes
// In production, replace with a proper database (PostgreSQL, MongoDB, etc.)

export let contentDB: any[] = [];
export let scheduledPostsDB: any[] = [];
export let trendsDB: any[] = [];
export let approvedTrends: Record<string, boolean> = {};
export let settingsDB: any = {
  autoPost: true,
  postingInterval: 120,
  defaultLanguage: 'en',
  defaultTone: 'professional',
  platforms: {
    facebook: true,
    instagram: true,
    twitter: true,
    youtube: false,
    pinterest: true,
    threads: true,
    linkedin: false
  },
  emailNotifications: true,
  trendAlerts: true,
  postingErrors: true
};
