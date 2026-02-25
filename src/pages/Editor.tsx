import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, History, Share, CheckCircle, Plus, Settings, Sparkles, Edit3, Wand2, UserSearch, RefreshCw, Send } from 'lucide-react';

export default function Editor() {
  const { id } = useParams();
  const [story, setStory] = useState<any>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch(`/api/stories/${id}`)
      .then(res => res.json())
      .then(data => {
        setStory(data);
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    scheduleSave(title, newContent);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    scheduleSave(newTitle, content);
  };

  const scheduleSave = (t: string, c: string) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      fetch(`/api/stories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: t, content: c, wordCount: c.split(/\s+/).filter(w => w.length > 0).length })
      });
    }, 1000);
  };

  const askMuse = async () => {
    if (!aiInput.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: content.slice(-1000), prompt: aiInput })
      });
      const data = await res.json();
      setSuggestion(data.suggestion);
    } catch (e) {
      console.error(e);
    }
    setIsGenerating(false);
    setAiInput('');
  };

  const insertSuggestion = () => {
    if (suggestion) {
      const newContent = content + '\n\n' + suggestion;
      setContent(newContent);
      setSuggestion(null);
      scheduleSave(title, newContent);
    }
  };

  if (!story) return <div className="flex h-screen items-center justify-center bg-bg-dark text-white">Loading...</div>;

  return (
    <div className="flex flex-col h-screen bg-bg-dark text-slate-100 font-sans overflow-hidden">
      {/* Top Nav */}
      <header className="flex items-center justify-between border-b border-border-dark px-6 py-3 bg-[#121118] z-20">
        <div className="flex items-center gap-4">
          <Link to="/" className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white hover:bg-primary-hover transition-colors">
            <Book size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={title} 
                onChange={handleTitleChange}
                className="bg-transparent text-white font-bold text-base outline-none focus:border-b focus:border-primary"
              />
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-dark text-slate-400 uppercase tracking-wider">Draft</span>
            </div>
            <p className="text-[11px] text-slate-500">Auto-saving...</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface-dark transition-colors text-sm text-slate-300">
              <History size={16} />
              <span>History</span>
            </button>
            <button className="bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2">
              <Share size={16} />
              Share
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar (Chapters) */}
        <aside className="w-64 border-r border-border-dark p-4 hidden xl:flex flex-col gap-4 bg-[#121118]">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Chapters</div>
          <nav className="flex flex-col gap-1">
            <a href="#" className="px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm flex items-center justify-between">
              <span>1. The Beginning</span>
              <CheckCircle size={14} />
            </a>
            <a href="#" className="px-3 py-2 rounded-lg hover:bg-surface-dark text-slate-400 text-sm">
              2. The Journey
            </a>
          </nav>
          <button className="mt-2 flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white text-sm transition-colors">
            <Plus size={16} /> Add Chapter
          </button>
        </aside>

        {/* Center Editor */}
        <section className="flex-1 overflow-y-auto bg-bg-dark relative scroll-smooth p-12">
          <div className="max-w-[800px] mx-auto min-h-full">
            <textarea
              value={content}
              onChange={handleContentChange}
              className="w-full h-full min-h-[60vh] bg-transparent text-slate-300 text-lg leading-relaxed outline-none resize-none font-serif"
              placeholder="Start writing your story here..."
            />
          </div>
        </section>

        {/* Right AI Muse Sidebar */}
        <aside className="w-80 border-l border-border-dark bg-[#121118] flex flex-col z-10">
          <div className="p-4 border-b border-border-dark flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-primary">
              <Sparkles size={18} />
              AI MUSE
            </div>
            <button className="text-slate-400 hover:text-slate-100">
              <Settings size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-2">
              <button onClick={() => { setAiInput("Suggest the next 2 paragraphs"); askMuse(); }} className="flex items-center gap-3 w-full p-3 rounded-xl bg-surface-dark border border-border-dark hover:border-primary transition-all text-left group">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Edit3 size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-200">Suggest Next</div>
                  <div className="text-[10px] text-slate-500">Generate 2 paragraphs</div>
                </div>
              </button>
              <button onClick={() => { setAiInput("Rewrite the last paragraph to be more dramatic and dark"); askMuse(); }} className="flex items-center gap-3 w-full p-3 rounded-xl bg-surface-dark border border-border-dark hover:border-primary transition-all text-left group">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                  <Wand2 size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-200">Fix Tone</div>
                  <div className="text-[10px] text-slate-500">Shift to Dramatic Noir</div>
                </div>
              </button>
              <button onClick={() => { setAiInput("Analyze the main character's arc so far"); askMuse(); }} className="flex items-center gap-3 w-full p-3 rounded-xl bg-surface-dark border border-border-dark hover:border-primary transition-all text-left group">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <UserSearch size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-200">Character Dev</div>
                  <div className="text-[10px] text-slate-500">Analyze arc</div>
                </div>
              </button>
            </div>

            {suggestion && (
              <>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-4">Live Suggestion</div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 shadow-[0_0_20px_rgba(50,17,212,0.15)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-white font-bold">AI GENERATED</span>
                    <button onClick={askMuse} className="w-6 h-6 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-white">
                      <RefreshCw size={12} />
                    </button>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4 font-serif">
                    {suggestion}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={insertSuggestion} className="flex-1 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">Insert</button>
                    <button onClick={() => setSuggestion(null)} className="px-3 py-2 bg-surface-dark text-slate-300 rounded-lg text-xs font-bold hover:bg-border-dark transition-colors">Discard</button>
                  </div>
                </div>
              </>
            )}
            
            {isGenerating && (
              <div className="p-4 rounded-xl bg-surface-dark border border-border-dark flex items-center justify-center">
                <RefreshCw className="animate-spin text-primary" size={20} />
                <span className="ml-2 text-sm text-slate-400">Muse is thinking...</span>
              </div>
            )}
          </div>

          {/* AI Input Box */}
          <div className="p-4 border-t border-border-dark bg-surface-dark">
            <div className="relative">
              <textarea 
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askMuse(); } }}
                className="w-full bg-bg-dark border border-border-dark rounded-xl text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary p-3 pr-10 resize-none outline-none" 
                placeholder="Ask Muse for anything..." 
                rows={2}
              />
              <button onClick={askMuse} disabled={isGenerating || !aiInput.trim()} className="absolute right-3 bottom-3 text-primary disabled:text-slate-600 hover:text-primary-hover transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom Status Bar */}
      <footer className="h-8 border-t border-border-dark bg-[#121118] px-4 flex items-center justify-between text-[10px] text-slate-400 font-medium z-20">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Connected</span>
          <span>Words: {content.split(/\s+/).filter(w => w.length > 0).length}</span>
          <span>Chars: {content.length}</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-white transition-colors">Spellcheck: ON</button>
          <button className="hover:text-white transition-colors">English (US)</button>
        </div>
      </footer>
    </div>
  );
}
