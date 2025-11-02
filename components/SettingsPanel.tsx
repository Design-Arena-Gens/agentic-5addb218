'use client';

import { useState, useEffect } from 'react';
import { Save, Key, Bell, Globe } from 'lucide-react';

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    // API Keys
    openaiKey: '',
    replicateToken: '',
    twitterApiKey: '',
    twitterApiSecret: '',
    twitterAccessToken: '',
    twitterAccessSecret: '',

    // Posting Settings
    autoPost: true,
    postingInterval: 120,
    defaultLanguage: 'en',
    defaultTone: 'professional',

    // Platform Settings
    platforms: {
      facebook: true,
      instagram: true,
      twitter: true,
      youtube: false,
      pinterest: true,
      threads: true,
      linkedin: false
    },

    // Notification Settings
    emailNotifications: true,
    trendAlerts: true,
    postingErrors: true
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) {
        setSettings({ ...settings, ...data.settings });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  return (
    <div className="space-y-6">
      {/* API Keys Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Key className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OpenAI API Key (for GPT content generation)
            </label>
            <input
              type="password"
              value={settings.openaiKey}
              onChange={(e) => setSettings({ ...settings, openaiKey: e.target.value })}
              placeholder="sk-..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">Get your key from <a href="https://platform.openai.com/api-keys" target="_blank" className="text-indigo-600">OpenAI Platform</a></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Replicate API Token (for free AI image generation)
            </label>
            <input
              type="password"
              value={settings.replicateToken}
              onChange={(e) => setSettings({ ...settings, replicateToken: e.target.value })}
              placeholder="r8_..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">Get your token from <a href="https://replicate.com/account/api-tokens" target="_blank" className="text-indigo-600">Replicate</a></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter API Key</label>
              <input
                type="password"
                value={settings.twitterApiKey}
                onChange={(e) => setSettings({ ...settings, twitterApiKey: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter API Secret</label>
              <input
                type="password"
                value={settings.twitterApiSecret}
                onChange={(e) => setSettings({ ...settings, twitterApiSecret: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Access Token</label>
              <input
                type="password"
                value={settings.twitterAccessToken}
                onChange={(e) => setSettings({ ...settings, twitterAccessToken: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Access Secret</label>
              <input
                type="password"
                value={settings.twitterAccessSecret}
                onChange={(e) => setSettings({ ...settings, twitterAccessSecret: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Posting Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Posting Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">Auto-Post</label>
              <p className="text-xs text-gray-500">Automatically post scheduled content</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoPost}
              onChange={(e) => setSettings({ ...settings, autoPost: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posting Interval (minutes)
            </label>
            <input
              type="number"
              value={settings.postingInterval}
              onChange={(e) => setSettings({ ...settings, postingInterval: parseInt(e.target.value) })}
              min="30"
              max="1440"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum time between posts (30 min - 24 hours)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
              <select
                value={settings.defaultLanguage}
                onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                <option value="en">English</option>
                <option value="ur">Urdu</option>
                <option value="hi">Hindi</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Tone</label>
              <select
                value={settings.defaultTone}
                onChange={(e) => setSettings({ ...settings, defaultTone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                <option value="professional">Professional</option>
                <option value="funny">Funny</option>
                <option value="informative">Informative</option>
                <option value="casual">Casual</option>
                <option value="inspiring">Inspiring</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Platforms</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(settings.platforms).map(([platform, enabled]) => (
            <div key={platform} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  platforms: { ...settings.platforms, [platform]: e.target.checked }
                })}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label className="text-sm font-medium text-gray-700 capitalize">{platform}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Email Notifications</label>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Trend Alerts</label>
            <input
              type="checkbox"
              checked={settings.trendAlerts}
              onChange={(e) => setSettings({ ...settings, trendAlerts: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Posting Error Alerts</label>
            <input
              type="checkbox"
              checked={settings.postingErrors}
              onChange={(e) => setSettings({ ...settings, postingErrors: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>{saved ? 'Saved!' : 'Save Settings'}</span>
        </button>
      </div>
    </div>
  );
}
