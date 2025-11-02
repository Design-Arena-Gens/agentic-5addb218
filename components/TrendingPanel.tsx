'use client';

import { useState, useEffect } from 'react';
import { Search, RefreshCw, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';

interface Trend {
  id: string;
  title: string;
  source: string;
  score: number;
  category: string;
  language: string;
  timestamp: string;
  approved: boolean | null;
}

export default function TrendingPanel({ onStatsUpdate }: { onStatsUpdate: () => void }) {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    language: 'all',
    region: 'global',
    category: 'all'
  });

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const res = await fetch(`/api/trends?${params}`);
      const data = await res.json();
      setTrends(data.trends || []);
      onStatsUpdate();
    } catch (error) {
      console.error('Error fetching trends:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveTrend = async (trendId: string, approved: boolean) => {
    try {
      await fetch('/api/trends/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trendId, approved })
      });
      setTrends(trends.map(t =>
        t.id === trendId ? { ...t, approved } : t
      ));
      onStatsUpdate();
    } catch (error) {
      console.error('Error approving trend:', error);
    }
  };

  const generateContent = async (trendId: string) => {
    try {
      await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trendId })
      });
      alert('Content generation started!');
      onStatsUpdate();
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Languages</option>
              <option value="en">English</option>
              <option value="ur">Urdu</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="global">Global</option>
              <option value="us">United States</option>
              <option value="pk">Pakistan</option>
              <option value="in">India</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="technology">Technology</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchTrends}
              disabled={loading}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Trends</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trends List */}
      <div className="grid grid-cols-1 gap-4">
        {trends.map((trend) => (
          <div key={trend.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{trend.title}</h3>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                    {trend.source}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Score: {trend.score}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Category: {trend.category}</span>
                  <span>Language: {trend.language}</span>
                  <span>{new Date(trend.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {trend.approved === null && (
                  <>
                    <button
                      onClick={() => approveTrend(trend.id, true)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                      title="Approve"
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => approveTrend(trend.id, false)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Reject"
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                  </>
                )}
                {trend.approved === true && (
                  <button
                    onClick={() => generateContent(trend.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Content</span>
                  </button>
                )}
                {trend.approved === false && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                    Rejected
                  </span>
                )}
                {trend.approved === true && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    Approved
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {trends.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No trends found. Click "Refresh Trends" to discover new topics.</p>
          </div>
        )}
      </div>
    </div>
  );
}
