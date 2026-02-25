import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Users, Compass, Settings, Plus, Search, Bell, BrainCircuit, Star, Timer } from 'lucide-react';

export default function Dashboard() {
  const [stories, setStories] = useState<any[]>([]);
  const [view, setView] = useState<'my-stories' | 'shared'>('my-stories');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  const createNewStory = async () => {
    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Untitled Story',
        content: '',
        genre: 'Fiction',
        progress: 0,
        wordCount: 0
      })
    });
    const newStory = await res.json();
    navigate(`/editor/${newStory._id}`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg-dark text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-border-dark bg-[#121118]">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Book size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">StoryFlow AI</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button onClick={() => setView('my-stories')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${view === 'my-stories' ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:bg-surface-dark'}`}>
            <Book size={18} />
            <span>My Stories</span>
          </button>
          <button onClick={() => setView('shared')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${view === 'shared' ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:bg-surface-dark'}`}>
            <Users size={18} />
            <span>Shared with me</span>
          </button>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-surface-dark transition-colors">
            <Compass size={18} />
            <span>Explore</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-surface-dark transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </a>
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-surface-dark p-4 rounded-xl border border-border-dark">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Pro Plan</p>
            <p className="text-sm text-slate-400 mb-4">Unlimited AI-assisted chapters and co-author slots.</p>
            <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-bold hover:bg-primary-hover transition-all">
              Upgrade Now
            </button>
          </div>
          <div className="mt-6 flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian" alt="User" />
            </div>
            <div>
              <p className="text-sm font-bold">Julian Barnes</p>
              <p className="text-xs text-slate-500">Author</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border-dark flex items-center justify-between px-8 bg-bg-dark/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input type="text" placeholder="Search your library..." className="w-full pl-10 pr-4 py-2 bg-surface-dark border-none rounded-lg focus:ring-2 focus:ring-primary text-sm text-white outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-surface-dark rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-dark"></span>
            </button>
            <button onClick={createNewStory} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors">
              <Plus size={16} />
              New Project
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2 className="text-4xl font-black tracking-tight mb-2">
                {view === 'my-stories' ? 'Welcome back, Storyteller' : 'Shared with me'}
              </h2>
              <p className="text-slate-400">
                {view === 'my-stories' 
                  ? `You have ${stories.filter(s => !s.isShared).length} active drafts and ${stories.filter(s => s.isShared).length} shared collaborations.`
                  : `You are collaborating on ${stories.filter(s => s.isShared).length} stories.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {view === 'my-stories' && (
                <button onClick={createNewStory} className="group relative flex flex-col items-center justify-center aspect-[2/3] rounded-xl border-2 border-dashed border-border-dark hover:border-primary transition-all bg-transparent">
                  <div className="w-12 h-12 rounded-full bg-surface-dark flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                    <Plus size={24} />
                  </div>
                  <span className="mt-4 font-bold text-slate-400 group-hover:text-primary">Create New Story</span>
                </button>
              )}

              {stories.filter(s => view === 'my-stories' ? !s.isShared : s.isShared).map(story => (
                <Link to={`/editor/${story._id}`} key={story._id} className="group flex flex-col bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border-dark hover:border-primary/50">
                  <div className="relative aspect-[2/3] overflow-hidden bg-slate-800 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img src={`https://picsum.photos/seed/${story._id}/400/600`} alt="Cover" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <h3 className="font-serif text-white text-xl font-bold leading-tight">{story.title}</h3>
                      <p className="text-white/70 text-xs mt-1 italic">{story.genre}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">{story.genre || 'Fiction'}</span>
                      {story.isShared && story.authorName && (
                        <span className="text-[10px] text-slate-400 font-medium truncate max-w-[100px]">By {story.authorName}</span>
                      )}
                    </div>
                    <div className="w-full bg-bg-dark h-1.5 rounded-full overflow-hidden mb-1">
                      <div className="bg-primary h-full" style={{ width: `${story.progress || 0}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                      <span>{story.progress || 0}% Drafted</span>
                      <span>{story.wordCount || 0} words</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 border-l border-border-dark bg-[#121118] overflow-y-auto p-6 hidden lg:block">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="text-primary" size={20} />
            <h4 className="font-bold text-lg">AI Recommendations</h4>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer group">
              <p className="text-sm font-medium leading-relaxed text-slate-300">"What if your protagonist discovers a map leading to a city that technically doesn't exist on any record?"</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary uppercase">Mystery Hook</span>
              </div>
            </div>
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/10 transition-colors cursor-pointer group">
              <p className="text-sm font-medium leading-relaxed text-slate-300">"Try introducing a character who only speaks in metaphors related to old clockwork."</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-500 uppercase">Character Trait</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-indigo-700 p-6 rounded-2xl text-white relative overflow-hidden mt-8">
          <div className="relative z-10">
            <h4 className="font-black text-xl mb-2">Join a Writing Sprint</h4>
            <p className="text-white/80 text-sm mb-4">Live sprint starting in 14 minutes. Boost your word count with the community.</p>
            <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-bold hover:shadow-lg transition-all">Join Now</button>
          </div>
          <Timer className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12" />
        </div>
      </aside>
    </div>
  );
}
