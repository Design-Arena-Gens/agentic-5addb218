'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Heart, MessageCircle } from 'lucide-react';

export default function Analytics() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalImpressions: 0,
    totalEngagement: 0,
    avgEngagementRate: 0
  });

  const [postsByPlatform, setPostsByPlatform] = useState([
    { platform: 'Facebook', posts: 24, color: '#1877F2' },
    { platform: 'Instagram', posts: 32, color: '#E4405F' },
    { platform: 'Twitter', posts: 45, color: '#1DA1F2' },
    { platform: 'YouTube', posts: 12, color: '#FF0000' },
    { platform: 'Pinterest', posts: 18, color: '#E60023' },
    { platform: 'Threads', posts: 28, color: '#000000' },
  ]);

  const [weeklyActivity, setWeeklyActivity] = useState([
    { day: 'Mon', posts: 12, engagement: 245 },
    { day: 'Tue', posts: 15, engagement: 312 },
    { day: 'Wed', posts: 18, engagement: 398 },
    { day: 'Thu', posts: 14, engagement: 287 },
    { day: 'Fri', posts: 20, engagement: 445 },
    { day: 'Sat', posts: 16, engagement: 356 },
    { day: 'Sun', posts: 13, engagement: 298 },
  ]);

  const [topTrends, setTopTrends] = useState([
    { trend: 'AI Technology', posts: 15, engagement: 1250 },
    { trend: 'Climate Change', posts: 12, engagement: 980 },
    { trend: 'Space Exploration', posts: 10, engagement: 875 },
    { trend: 'Health & Fitness', posts: 14, engagement: 1100 },
    { trend: 'Gaming News', posts: 11, engagement: 920 },
  ]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      const data = await res.json();
      if (data.stats) setStats(data.stats);
      if (data.postsByPlatform) setPostsByPlatform(data.postsByPlatform);
      if (data.weeklyActivity) setWeeklyActivity(data.weeklyActivity);
      if (data.topTrends) setTopTrends(data.topTrends);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Posts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Impressions</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalImpressions.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Engagement</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalEngagement.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Engagement</p>
              <p className="text-3xl font-bold text-gray-900">{stats.avgEngagementRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <MessageCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="posts" stroke="#6366F1" strokeWidth={2} />
              <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Posts by Platform */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Posts by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={postsByPlatform}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ platform, posts }) => `${platform}: ${posts}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="posts"
              >
                {postsByPlatform.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Trends */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="trend" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="posts" fill="#6366F1" />
            <Bar dataKey="engagement" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Platform Performance Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Posts</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg. Engagement</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {postsByPlatform.map((platform) => (
                <tr key={platform.platform} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{platform.platform}</td>
                  <td className="py-3 px-4">{platform.posts}</td>
                  <td className="py-3 px-4">{(Math.random() * 5 + 2).toFixed(1)}%</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
