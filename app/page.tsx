'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, MessageSquare, Image, Calendar, Settings, BarChart3, Globe } from 'lucide-react';
import TrendingPanel from '@/components/TrendingPanel';
import ContentGenerator from '@/components/ContentGenerator';
import PostScheduler from '@/components/PostScheduler';
import Analytics from '@/components/Analytics';
import SettingsPanel from '@/components/SettingsPanel';

export default function Home() {
  const [activeTab, setActiveTab] = useState('trending');
  const [stats, setStats] = useState({
    totalPosts: 0,
    scheduledPosts: 0,
    activeTrends: 0,
    platforms: 7
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const tabs = [
    { id: 'trending', name: 'Trending Discovery', icon: TrendingUp },
    { id: 'content', name: 'Content Generator', icon: MessageSquare },
    { id: 'scheduler', name: 'Post Scheduler', icon: Calendar },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Social Media Manager</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{stats.totalPosts}</p>
                <p className="text-xs text-gray-600">Total Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.scheduledPosts}</p>
                <p className="text-xs text-gray-600">Scheduled</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{stats.activeTrends}</p>
                <p className="text-xs text-gray-600">Active Trends</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'trending' && <TrendingPanel onStatsUpdate={fetchStats} />}
        {activeTab === 'content' && <ContentGenerator onStatsUpdate={fetchStats} />}
        {activeTab === 'scheduler' && <PostScheduler onStatsUpdate={fetchStats} />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'settings' && <SettingsPanel />}
      </main>
    </div>
  );
}
