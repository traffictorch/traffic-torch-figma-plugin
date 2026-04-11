import React, { useState, useEffect } from 'react';
import './index.css';

const tools = [
  { emoji: "📍", name: "Local SEO Tool", path: "https://traffictorch.net/local-seo-tool/" },
  { emoji: "🎯", name: "SEO Intent Tool", path: "https://traffictorch.net/seo-intent-tool/" },
  { emoji: "🧬", name: "Topical Authority Tool", path: "https://traffictorch.net/topical-authority-tool/" },
  { emoji: "🧬", name: "SEO Entity Tool", path: "https://traffictorch.net/seo-entity-tool/" },
  { emoji: "⚡", name: "Quit Risk Tool", path: "https://traffictorch.net/quit-risk-tool/" },
  { emoji: "🔍", name: "GEO Audit Tool", path: "https://traffictorch.net/geo-audit-tool/" },
  { emoji: "🤖", name: "AI Content Tool", path: "https://traffictorch.net/ai-content-tool/" },
  { emoji: "🆚", name: "Competitive Gap (VS) Tool", path: "https://traffictorch.net/vs-tool/" }
];

const tabs = ['Welcome', 'All Tools', 'Help Guides'];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Tools');
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [siteUrl, setSiteUrl] = useState('https://traffictorch.net');
  const [figmaUrl, setFigmaUrl] = useState('');

  useEffect(() => {
    window.parent.postMessage({ type: 'GET_FIGMA_FILE_URL' }, '*');
    window.addEventListener('message', (event) => {
      if (event.data.type === 'FIGMA_URL') {
        setFigmaUrl(event.data.url);
        if (!siteUrl || siteUrl === 'https://traffictorch.net') setSiteUrl(event.data.url);
      }
    });
  }, []);

  const launchTool = () => {
    window.parent.postMessage({
      type: 'LAUNCH_TOOL',
      toolBase: selectedTool.path,
      siteUrl: siteUrl
    }, '*');
  };

  return (
    <div className="plugin-root p-6 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark min-h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🔦</div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Traffic Torch</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">AI GEO & SEO Tools for Figma</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-all ${activeTab === tab 
              ? 'border-b-2 border-accent text-accent' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* All Tools Tab */}
      {activeTab === 'All Tools' && (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium mb-2 text-gray-500 dark:text-gray-400">Tool</label>
            <select 
              value={selectedTool.path}
              onChange={(e) => setSelectedTool(tools.find(t => t.path === e.target.value)!)}
              className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:outline-none focus:border-accent text-base"
            >
              {tools.map(tool => (
                <option key={tool.path} value={tool.path}>
                  {tool.emoji} {tool.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium mb-2 text-gray-500 dark:text-gray-400">Site URL</label>
            <input
              type="url"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:outline-none focus:border-accent"
              placeholder="https://your-site.com"
            />
            <button 
              onClick={() => setSiteUrl(figmaUrl || 'https://traffictorch.net')}
              className="text-xs text-accent mt-2 hover:underline"
            >
              📋 Use current Figma file preview
            </button>
          </div>

          <button 
            onClick={launchTool}
            className="w-full bg-accent hover:bg-emerald-600 text-white font-semibold py-4 rounded-3xl flex items-center justify-center gap-2 transition-all text-lg"
          >
            🚀 Launch Tool with URL →
          </button>
        </div>
      )}

      {/* Welcome Tab */}
      {activeTab === 'Welcome' && (
        <div className="text-center py-12 space-y-6">
          <div className="text-6xl">🔦</div>
          <h2 className="text-2xl font-semibold">Welcome to Traffic Torch</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
            Instant 360° SEO, UX, GEO and AI health analysis directly inside Figma.<br />
            Educational. Privacy-first. Same tools as the WordPress version.
          </p>
          <button 
            onClick={() => setActiveTab('All Tools')}
            className="bg-accent text-white px-10 py-3 rounded-3xl font-medium"
          >
            Start Analyzing →
          </button>
        </div>
      )}

      {/* Help Guides Tab */}
      {activeTab === 'Help Guides' && (
        <div className="py-8 text-center">
          <p className="mb-6 text-gray-600 dark:text-gray-400">Educational guides and best practices from Traffic Torch</p>
          <a 
            href="https://traffictorch.net/help-guides/" 
            target="_blank"
            className="inline-block bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-8 py-4 rounded-3xl text-sm font-medium"
          >
            📚 Open Help Guides →
          </a>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6 text-center">
        <button 
          onClick={() => window.open('https://traffictorch.net', '_blank')}
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          Made with ❤️ for better SEO & UX design
        </button>
      </div>
    </div>
  );
};

export default App;
