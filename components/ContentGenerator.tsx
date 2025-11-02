'use client';

import { useState, useEffect } from 'react';
import { Wand2, Download, Copy, Trash2 } from 'lucide-react';

interface GeneratedContent {
  id: string;
  trendId: string;
  trendTitle: string;
  text: string;
  imageUrl?: string;
  platforms: string[];
  tone: string;
  language: string;
  timestamp: string;
}

export default function ContentGenerator({ onStatsUpdate }: { onStatsUpdate: () => void }) {
  const [content, setContent] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data.content || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (contentId: string) => {
    try {
      await fetch(`/api/content/${contentId}`, { method: 'DELETE' });
      setContent(content.filter(c => c.id !== contentId));
      onStatsUpdate();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Content copied to clipboard!');
  };

  const scheduleContent = async (contentId: string) => {
    try {
      await fetch('/api/scheduler/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId })
      });
      alert('Content scheduled successfully!');
      onStatsUpdate();
    } catch (error) {
      console.error('Error scheduling content:', error);
    }
  };

  const platformColors: Record<string, string> = {
    facebook: 'bg-blue-500',
    instagram: 'bg-pink-500',
    twitter: 'bg-sky-500',
    youtube: 'bg-red-500',
    pinterest: 'bg-red-600',
    threads: 'bg-black',
    linkedin: 'bg-blue-700'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Generated Content</h2>
            <p className="text-gray-600 mt-1">AI-generated posts ready for scheduling</p>
          </div>
          <button
            onClick={fetchContent}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Wand2 className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {content.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-500">Based on: {item.trendTitle}</h3>
                <button
                  onClick={() => deleteContent(item.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {item.tone}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {item.language}
                </span>
              </div>
            </div>

            {/* Generated Image */}
            {item.imageUrl && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img src={item.imageUrl} alt="Generated" className="w-full h-48 object-cover" />
              </div>
            )}

            {/* Generated Text */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800 whitespace-pre-wrap">{item.text}</p>
            </div>

            {/* Platforms */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.platforms.map((platform) => (
                <span
                  key={platform}
                  className={`px-3 py-1 ${platformColors[platform] || 'bg-gray-500'} text-white text-xs rounded-full`}
                >
                  {platform}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => copyToClipboard(item.text)}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center justify-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => scheduleContent(item.id)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Schedule</span>
              </button>
            </div>

            <div className="mt-3 text-xs text-gray-500 text-right">
              {new Date(item.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {content.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Wand2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No generated content yet.</p>
          <p className="text-gray-500 text-sm mt-2">Approve trends and generate content to see posts here.</p>
        </div>
      )}
    </div>
  );
}
