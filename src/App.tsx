import React, { useState, useEffect } from 'react';
import './index.css';

const tools = [
  { emoji: "⚜️", name: "Topical Authority", path: "https://traffictorch.net/topical-authority-audit-tool/" },
  { emoji: "🧬", name: "Entity Extractor", path: "https://traffictorch.net/seo-entity-extractor-tool/" },
  { emoji: "🎯", name: "SEO Intent", path: "https://traffictorch.net/seo-intent-tool/" },
  { emoji: "📍", name: "Local SEO", path: "https://traffictorch.net/local-seo-tool/" },
  { emoji: "🛒", name: "Product SEO", path: "https://traffictorch.net/product-seo-tool/" },
  { emoji: "⚙️", name: "Schema Generator", path: "https://traffictorch.net/schema-generator/" },
  { emoji: "🔍", name: "AI Search Optimization", path: "https://traffictorch.net/ai-search-optimization-tool/" },
  { emoji: "🎙️", name: "AI Voice Search", path: "https://traffictorch.net/ai-voice-search-tool/" },
  { emoji: "🤖", name: "AI Content", path: "https://traffictorch.net/ai-audit-tool/" },
  { emoji: "⚡", name: "Quit Risk", path: "https://traffictorch.net/quit-risk-tool/" },
  { emoji: "⚖️", name: "SEO + UX Audit", path: "https://traffictorch.net/" },
  { emoji: "🔑", name: "Keyword Research", path: "https://traffictorch.net/keyword-research-tool/" },
  { emoji: "📝", name: "Keyword Placement", path: "https://traffictorch.net/keyword-tool/" },
  { emoji: "🆚", name: "Competition (VS)", path: "https://traffictorch.net/keyword-vs-tool/" }
];

const tabs = ['Welcome', 'All Tools', 'Help Guides'];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Welcome' | 'All Tools' | 'Help Guides'>('All Tools');
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [siteUrl, setSiteUrl] = useState('https://traffictorch.net');
  const [figmaUrl, setFigmaUrl] = useState('');

  useEffect(() => {
    window.parent.postMessage({ type: 'GET_FIGMA_FILE_URL' }, '*');
    window.addEventListener('message', (event) => {
      if (event.data.type === 'FIGMA_URL' && event.data.url) {
        setFigmaUrl(event.data.url);
      }
    });
  }, []);

  const launchTool = () => {
    const fullUrl = siteUrl 
      ? `${selectedTool.path}?url=${encodeURIComponent(siteUrl)}`
      : selectedTool.path;
    window.parent.postMessage({ 
      type: 'LAUNCH_TOOL', 
      toolBase: selectedTool.path, 
      siteUrl 
    }, '*');
    window.open(fullUrl, '_blank');
  };

  return (
    <div className="plugin-root p-6 bg-white dark:bg-[#111827] text-[#1f2937] dark:text-[#e5e7eb] min-h-full overflow-auto">
      {/* Header with 🚥 */}
      <div className="flex items-center gap-3 mb-8">
        <div className="text-4xl">🚥</div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Traffic Torch</h1>
          <p className="text-sm opacity-70">AI GEO & SEO Tools for Figma</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab 
                ? 'border-b-2 border-[#10b981] text-[#10b981]' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* All Tools Tab */}
      {activeTab === 'All Tools' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-medium mb-2 text-gray-500 dark:text-gray-400">Select Tool</label>
            <select 
              value={selectedTool.path}
              onChange={(e) => setSelectedTool(tools.find(t => t.path === e.target.value)!)}
              className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:outline-none focus:border-[#10b981] text-base"
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
              className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:outline-none focus:border-[#10b981]"
              placeholder="https://your-site.com"
            />
            <button 
              onClick={() => setSiteUrl(figmaUrl || 'https://traffictorch.net')}
              className="text-xs mt-2 text-[#10b981] hover:underline block"
            >
              📋 Use current Figma file preview
            </button>
          </div>

          <button 
            onClick={launchTool}
            className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-semibold py-4 rounded-3xl flex items-center justify-center gap-3 transition-all text-lg shadow-sm active:scale-[0.985]"
          >
            🚀 Launch Tool with URL →
          </button>
        </div>
      )}

      {/* Welcome Tab */}
      {activeTab === 'Welcome' && (
        <div className="text-center py-16 space-y-6">
          <div className="text-6xl mb-4">🚥</div>
          <h2 className="text-2xl font-semibold">Welcome to Traffic Torch</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
            Instant 360° SEO, UX, GEO and AI health analysis directly inside Figma.<br />
            Educational reports • Competitive gaps • AI-generated fixes.
          </p>
          <button 
            onClick={() => setActiveTab('All Tools')}
            className="bg-[#10b981] text-white px-10 py-3.5 rounded-3xl font-medium mt-6 hover:bg-[#059669]"
          >
            Start Your Analysis →
          </button>
        </div>
      )}

      {/* Help Guides Tab */}
      {activeTab === 'Help Guides' && (
        <div className="py-12 text-center">
          <div className="text-5xl mb-6">📚</div>
          <p className="mb-8 text-gray-600 dark:text-gray-400">Educational guides and best practices from Traffic Torch</p>
          <a 
            href="https://traffictorch.net/ai-ux-seo-help-guides/" 
            target="_blank"
            className="inline-block bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-10 py-4 rounded-3xl text-sm font-medium transition-colors"
          >
            Open Help Guides →
          </a>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-12">
        Made with ❤️ for better SEO & UX design
      </div>
    </div>
  );
};

export default App;
