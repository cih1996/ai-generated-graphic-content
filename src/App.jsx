import React, { useState, useEffect } from 'react';
import { Layout, Copy, Check, Menu, Smartphone } from 'lucide-react';

function App() {
  const [pages, setPages] = useState([]);
  const [activePageId, setActivePageId] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Dynamically import all index.jsx files from src/pages
    const modules = import.meta.glob('./pages/*/index.jsx', { eager: true });
    
    const loadedPages = Object.entries(modules).map(([path, module]) => {
      // path example: ./pages/contract-trading-warning/index.jsx
      const id = path.split('/')[2]; 
      return {
        id,
        component: module.default,
        meta: module.meta || { title: id, copy: 'No copy provided.' }
      };
    });

    setPages(loadedPages);
    if (loadedPages.length > 0) {
      setActivePageId(loadedPages[0].id);
    }
  }, []);

  const activePage = pages.find(p => p.id === activePageId);

  const handleCopy = () => {
    if (activePage?.meta?.copy) {
      navigator.clipboard.writeText(activePage.meta.copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden font-sans">
      
      {/* Sidebar - Page List */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <Menu className="w-5 h-5 text-indigo-600" />
          <h1 className="font-bold text-lg text-gray-900">图文生成器</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {pages.map(page => (
            <button
              key={page.id}
              onClick={() => setActivePageId(page.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activePageId === page.id
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {page.meta.title || page.id}
            </button>
          ))}
        </div>
        <div className="p-4 text-xs text-gray-400 text-center border-t border-gray-100">
          v0.1.0 Alpha
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel - Copywriting */}
        <div className="w-1/2 max-w-xl bg-white flex flex-col border-r border-gray-200">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
             <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                   <Layout className="w-5 h-5 text-gray-500" />
                   文案预览
                </h2>
                <p className="text-sm text-gray-500 mt-1">小红书 / 抖音文案配置</p>
             </div>
             <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                   copied 
                   ? 'bg-green-100 text-green-700 border border-green-200' 
                   : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
                }`}
             >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '已复制' : '一键复制'}
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-full prose prose-indigo max-w-none">
                {activePage ? (
                   <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-gray-700">
                      {activePage.meta.copy}
                   </pre>
                ) : (
                   <div className="text-gray-400 text-center mt-20">请选择一个页面</div>
                )}
             </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-8 relative">
           <div className="absolute top-6 right-6 flex items-center gap-2 text-gray-400 text-sm font-medium bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
              <Smartphone className="w-4 h-4" />
              预览模式
           </div>
           
           {activePage ? (
              <div className="relative shadow-2xl rounded-[3rem] border-[8px] border-gray-900 bg-gray-900 overflow-hidden" style={{ height: '844px', width: '390px' }}>
                 {/* Notch */}
                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50"></div>
                 
                 {/* Content */}
                 <div className="w-full h-full bg-white overflow-y-auto no-scrollbar">
                    <activePage.component />
                 </div>
              </div>
           ) : (
              <div className="text-gray-400">请选择一个页面进行预览</div>
           )}
        </div>

      </div>
    </div>
  )
}

export default App
