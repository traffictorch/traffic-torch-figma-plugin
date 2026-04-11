import React, { useState, useEffect } from 'react';
import './index.css';

const tools: { name: string; emoji: string; path: string }[] = [
  { name: "Topical Authority Tool", emoji: "🧬", path: "https://traffictorch.net/topical-authority-tool/" },
  { name: "SEO Entity Tool", emoji: "🧬", path: "https://traffictorch.net/seo-entity-tool/" },
  { name: "SEO Intent Tool", emoji: "🎯", path: "https://traffictorch.net/seo-intent-tool/" },
  { name: "Local SEO Tool", emoji: "📍", path: "https://traffictorch.net/local-seo-tool/" },
  { name: "Product SEO Tool", emoji: "🛒", path: "https://traffictorch.net/product-seo-tool/" },
  { name: "Quit Risk Tool", emoji: "⚡", path: "https://traffictorch.net/quit-risk-tool/" },
  { name: "GEO Audit Tool", emoji: "🔍", path: "https://traffictorch.net/geo-audit-tool/" },
  { name: "AI Content Tool", emoji: "🤖", path: "https://traffictorch.net/ai-content-tool/" },
  { name: "AI Voice Search Tool", emoji: "🎙️", path: "https://traffictorch.net/ai-voice-search-tool/" },
  { name: "Schema Generator Tool", emoji: "⚙️", path: "https://traffictorch.net/schema-generator-tool/" },
  { name: "Keyword Research Tool", emoji: "📝", path: "https://traffictorch.net/keyword-research/" },
  { name: "Keyword Placement Tool", emoji: "🗝️", path: "https://traffictorch.net/keyword-placement/" },
  { name: "VS Tool (Competitive Gap)", emoji: "🆚", path: "https://traffictorch.net/vs-tool/" }
];

const tabs = ['Welcome', 'All Tools', 'Help Guides', 'Recommended Plugins', 'Pro'];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Welcome');
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [siteUrl, setSiteUrl] = useState('');
  const [figmaUrl, setFigmaUrl] = useState('');

  useEffect(() => {
    // Ask plugin code for current Figma file URL
    window.parent.postMessage({ type: 'GET_FIGMA_FILE_URL' }, '*');
    window.addEventListener('message', (event) => {
      if (event.data.type === 'FIGMA_URL') {
        setFigmaUrl(event.data.url);
        if (!siteUrl) setSiteUrl(event.data.url);
      }
    });
  }, []);

  const launchTool = () => {
    window.parent.postMessage({
      type: 'LAUNCH_TOOL',
      toolBase: selectedTool.path,
      siteUrl: siteUrl || figmaUrl
    }, '*');
  };

  return (
    <div className="plugin-root p-5 text-text-light dark:text-text-dark bg-white dark:bg-gray-900 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center text-white text-2xl">🔦</div>
        <div>
          <h1 className="text-2xl font-semibold">Traffic Torch</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">AI GEO &amp; SEO Tools for Figma</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-5 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'border-accent text-accent'
                : 'border-transparent hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Welcome Tab */}
      {activeTab === 'Welcome' && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-3xl">
            <h2 className="text-xl font-semibold mb-2">👋 Welcome to Traffic Torch in Figma</h2>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Instant 360° SEO, UX, GEO and AI health score analysis directly inside your design file.
              Educational, privacy-first, and built with the same tools as the WordPress plugin.
            </p>
          </div>
          <button
            onClick={launchTool}
            className="w-full bg-accent hover:bg-emerald-600 text-white font-medium py-4 px-6 rounded-3xl flex items-center justify-center gap-2 text-lg transition-all"
          >
            🚀 Launch Tool with URL →
          </button>
        </div>
      )}

      {/* All Tools Tab */}
      {activeTab === 'All Tools' && (
        <div className="space-y-5">
          <select
            value={selectedTool.path}
            onChange={(e) => {
              const tool = tools.find(t => t.path === e.target.value)!;
              setSelectedTool(tool);
            }}
            className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl text-base focus:outline-none focus:border-accent"
          >
            {tools.map(tool => (
              <option key={tool.path} value={tool.path}>
                {tool.emoji} {tool.name}
              </option>
            ))}
          </select>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700">
            <label className="block text-xs font-medium mb-2 text-gray-500">Site / Preview URL</label>
            <input
              type="url"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://your-site.com"
              className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl focus:outline-none focus:border-accent"
            />
            <button
              onClick={() => setSiteUrl(figmaUrl)}
              className="text-xs mt-3 text-accent hover:underline flex items-center gap-1"
            >
              📋 Use current Figma file preview
            </button>
          </div>

          <button
            onClick={launchTool}
            className="w-full bg-accent hover:bg-emerald-600 text-white font-semibold py-4 rounded-3xl flex items-center justify-center gap-3 transition-all"
          >
            <span>Launch {selectedTool.emoji} {selectedTool.name}</span>
          </button>
        </div>
      )}

      {/* Help Guides Tab */}
      {activeTab === 'Help Guides' && (
        <div className="text-center py-12">
          <p className="text-sm mb-4">📚 Educational guides from Traffic Torch</p>
          <a
            href="https://traffictorch.net/help-guides/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 px-8 py-4 rounded-3xl text-sm font-medium"
          >
            Open Help Guides →
          </a>
        </div>
      )}

      {/* Recommended Plugins + Pro tabs (simple placeholders — expand later) */}
      {(activeTab === 'Recommended Plugins' || activeTab === 'Pro') && (
        <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Coming soon — educational recommendations and Pro features matching traffictorch.net
        </div>
      )}

      {/* Footer Help */}
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={() => window.open('https://traffictorch.net/help-guides/', '_blank')}
          className="w-full text-xs font-medium py-3 border border-gray-200 dark:border-gray-700 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          📋 Help Guides
        </button>
      </div>
    </div>
  );
};

export default App;
