'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Send, Trash2 } from 'lucide-react';

interface ScheduledPost {
  id: string;
  contentId: string;
  text: string;
  imageUrl?: string;
  platforms: string[];
  scheduledTime: string;
  status: 'scheduled' | 'posted' | 'failed';
  postedAt?: string;
}

export default function PostScheduler({ onStatsUpdate }: { onStatsUpdate: () => void }) {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoPost, setAutoPost] = useState(true);

  useEffect(() => {
    fetchScheduledPosts();
    const interval = setInterval(fetchScheduledPosts, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchScheduledPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/scheduler');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching scheduled posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await fetch(`/api/scheduler/${postId}`, { method: 'DELETE' });
      setPosts(posts.filter(p => p.id !== postId));
      onStatsUpdate();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const postNow = async (postId: string) => {
    try {
      await fetch(`/api/scheduler/${postId}/post`, { method: 'POST' });
      alert('Post published successfully!');
      fetchScheduledPosts();
      onStatsUpdate();
    } catch (error) {
      console.error('Error posting:', error);
      alert('Failed to post. Check your API credentials.');
    }
  };

  const toggleAutoPost = async () => {
    try {
      await fetch('/api/settings/autopost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !autoPost })
      });
      setAutoPost(!autoPost);
    } catch (error) {
      console.error('Error toggling auto-post:', error);
    }
  };

  const statusColors = {
    scheduled: 'bg-yellow-100 text-yellow-800',
    posted: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800'
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
            <h2 className="text-2xl font-bold text-gray-900">Post Scheduler</h2>
            <p className="text-gray-600 mt-1">Manage and schedule your social media posts</p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={autoPost}
                onChange={toggleAutoPost}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">Auto-post enabled</span>
            </label>
            <button
              onClick={fetchScheduledPosts}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Scheduled Posts */}
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-3 py-1 ${statusColors[post.status]} text-sm rounded-full font-medium`}>
                    {post.status}
                  </span>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.scheduledTime).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(post.scheduledTime).toLocaleTimeString()}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.platforms.map((platform) => (
                    <span
                      key={platform}
                      className={`px-3 py-1 ${platformColors[platform] || 'bg-gray-500'} text-white text-xs rounded-full`}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              {post.status === 'scheduled' && (
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.imageUrl && (
                <div className="rounded-lg overflow-hidden">
                  <img src={post.imageUrl} alt="Post" className="w-full h-48 object-cover" />
                </div>
              )}
              <div className={`${post.imageUrl ? '' : 'md:col-span-2'}`}>
                <div className="p-4 bg-gray-50 rounded-lg h-full">
                  <p className="text-gray-800 whitespace-pre-wrap">{post.text}</p>
                </div>
              </div>
            </div>

            {post.status === 'scheduled' && (
              <div className="mt-4">
                <button
                  onClick={() => postNow(post.id)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Post Now</span>
                </button>
              </div>
            )}

            {post.postedAt && (
              <div className="mt-3 text-xs text-gray-500 text-right">
                Posted at {new Date(post.postedAt).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {posts.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No scheduled posts yet.</p>
          <p className="text-gray-500 text-sm mt-2">Schedule content from the Content Generator to see posts here.</p>
        </div>
      )}
    </div>
  );
}
