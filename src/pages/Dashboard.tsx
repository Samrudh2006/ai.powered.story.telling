import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Users, Compass, Settings, Plus, Search, Bell, BrainCircuit, Star, Timer, GitBranch, Image as ImageIcon, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, or } from 'firebase/firestore';
import { parseAiJson } from '../utils/parseAiJson';

export default function Dashboard() {
  const { user, userProfile, logout } = useAuth();
  const [stories, setStories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [view, setView] = useState<'my-stories' | 'shared' | 'storybranch' | 'loreforge' | 'portrait' | 'settings' | 'profile'>('my-stories');
  const [aiRecommendations, setAiRecommendations] = useState<{ text: string; type: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Fetch user's stories and shared stories
    const q = query(
      collection(db, 'stories'),
      or(
        where('authorId', '==', user.uid),
        where('isShared', '==', true)
      )
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const storiesData = snapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
      }));
        
      // Sort by updatedAt descending
      storiesData.sort((a: any, b: any) => b.updatedAt - a.updatedAt);
      setStories(storiesData);
    }, (error) => {
      console.error("Error fetching stories:", error);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (stories.length === 0) return;
    const storyContext = stories.slice(0, 5)
      .map((s: any) => `"${s.title}" (${s.genre || 'Fiction'})`)
      .join(', ');
    fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemPrompt: 'You are a creative writing coach. Return ONLY a raw JSON object with no markdown fences or extra text.',
        messages: [
          {
            role: 'user',
            content: `A writer is working on these stories: ${storyContext}. Generate 2 short, inspiring creative writing suggestions to spark their imagination. Return ONLY this JSON: {"suggestions":[{"text":"...","type":"Hook"},{"text":"...","type":"Character Trait"}]}. Each suggestion text should be one vivid sentence (max 25 words). Types can be: Hook, Character Trait, Plot Twist, World Building, Dialogue Prompt.`,
          },
        ],
        maxTokens: 256,
      }),
    })
      .then(r => r.json())
      .then(data => {
        const result = parseAiJson<{ suggestions: { text: string; type: string }[] }>(data.text || '');
        if (result?.suggestions && Array.isArray(result.suggestions)) {
          setAiRecommendations(result.suggestions.slice(0, 2));
        }
      })
      .catch((err) => { console.error('Failed to fetch AI recommendations:', err); });
  }, [stories]);

  const createNewStory = async () => {
    if (!user) return;
    
    try {
      const newStory = {
        title: 'Untitled Story',
        content: '',
        genre: 'Fiction',
        progress: 0,
        wordCount: 0,
        isShared: false,
        authorName: userProfile?.displayName || user.displayName || 'Anonymous',
        authorId: user.uid,
        versions: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      const docRef = await addDoc(collection(db, 'stories'), newStory);
      navigate(`/editor/${docRef.id}`);
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const deleteStory = async (storyId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) return;

    try {
      const { deleteDoc, doc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'stories', storyId));
      showToast('Story deleted successfully', 'success');
    } catch (error) {
      console.error("Error deleting story:", error);
      showToast('Failed to delete story', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredStories = stories
    .filter(s => view === 'my-stories' ? !s.isShared : s.isShared)
    .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.genre.toLowerCase().includes(searchQuery.toLowerCase()));

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
        <nav className="flex-1 px-4 space-y-6 mt-4 overflow-y-auto">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">Library</div>
            <div className="space-y-1">
              <button onClick={() => setView('my-stories')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${view === 'my-stories' ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:bg-surface-dark'}`}>
                <Book size={18} />
                <span>My Stories</span>
              </button>
              <button onClick={() => setView('shared')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${view === 'shared' ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:bg-surface-dark'}`}>
                <Users size={18} />
                <span>Shared with me</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">Explore</div>
            <div className="space-y-1">
              <button onClick={() => navigate('/explore', { state: { tab: 'storybranch' } })} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-slate-400 hover:bg-surface-dark`}>
                <GitBranch size={18} />
                <span>StoryBranch</span>
              </button>
              <button onClick={() => navigate('/explore', { state: { tab: 'loreforge' } })} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-slate-400 hover:bg-surface-dark`}>
                <Users size={18} />
                <span>LoreForge AI</span>
              </button>
              <button onClick={() => navigate('/explore', { state: { tab: 'portrait' } })} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-slate-400 hover:bg-surface-dark`}>
                <ImageIcon size={18} />
                <span>Portrait Studio</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-border-dark space-y-1">
          <button onClick={() => setView('profile')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${view === 'profile' ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:bg-surface-dark'}`}>
            <User size={18} />
            <span>Profile</span>
          </button>
          <button onClick={() => setView('settings')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${view === 'settings' ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:bg-surface-dark'}`}>
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
        <div className="p-4 mt-auto">
          <div className="bg-surface-dark p-4 rounded-xl border border-border-dark">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Pro Plan</p>
            <p className="text-sm text-slate-400 mb-4">Unlimited AI-assisted chapters and co-author slots.</p>
            <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-bold hover:bg-primary-hover transition-all">
              Upgrade Now
            </button>
          </div>
          <div className="mt-6 flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                <img src={userProfile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`} alt="User" />
              </div>
              <div>
                <p className="text-sm font-bold truncate max-w-[100px]">{userProfile?.displayName || 'Author'}</p>
                <p className="text-xs text-slate-500 truncate max-w-[100px]">{userProfile?.email || user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400 hover:bg-surface-dark rounded-lg transition-colors" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border-dark flex items-center justify-between px-8 bg-bg-dark/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search your library..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-dark border-none rounded-lg focus:ring-2 focus:ring-primary text-sm text-white outline-none" 
              />
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
            {(view === 'my-stories' || view === 'shared') && (
              <>
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
                    {view === 'my-stories' && !searchQuery && (
                      <button onClick={createNewStory} className="group relative flex flex-col items-center justify-center aspect-[2/3] rounded-xl border-2 border-dashed border-border-dark hover:border-primary transition-all bg-transparent">
                        <div className="w-12 h-12 rounded-full bg-surface-dark flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                          <Plus size={24} />
                        </div>
                        <span className="mt-4 font-bold text-slate-400 group-hover:text-primary">Create New Story</span>
                      </button>
                    )}

                    {filteredStories.map(story => (
                      <Link to={`/editor/${story._id}`} key={story._id} className="group flex flex-col bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border-dark hover:border-primary/50 relative">
                        <button 
                          onClick={(e) => deleteStory(story._id, e)}
                          className="absolute top-2 right-2 z-30 p-1.5 bg-black/50 text-white/50 hover:text-red-400 hover:bg-black/80 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                          title="Delete Story"
                        >
                          <Plus size={16} className="rotate-45" />
                        </button>
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

                  {filteredStories.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-20 h-20 bg-surface-dark rounded-full flex items-center justify-center text-slate-500 mb-4">
                        <Search size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">No stories found</h3>
                      <p className="text-slate-400 max-w-md">
                        {searchQuery 
                          ? `We couldn't find any stories matching "${searchQuery}". Try a different search term.`
                          : "You haven't created any stories yet. Start your journey by creating a new project!"}
                      </p>
                      {!searchQuery && view === 'my-stories' && (
                        <button onClick={createNewStory} className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-hover transition-colors">
                          Create Your First Story
                        </button>
                      )}
                    </div>
                  )}
              </>
            )}

            {view === 'settings' && (
              <div className="max-w-3xl">
                <div className="mb-10">
                  <h2 className="text-4xl font-black tracking-tight mb-2">Settings</h2>
                  <p className="text-slate-400">Manage your application preferences and account settings.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-surface-dark border border-border-dark rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Settings size={20} className="text-primary" /> General Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-border-dark">
                        <div>
                          <div className="font-medium">Dark Mode</div>
                          <div className="text-sm text-slate-400">Toggle dark mode appearance</div>
                        </div>
                        <button className="w-12 h-6 rounded-full bg-primary relative transition-colors">
                          <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white transition-all"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border-dark">
                        <div>
                          <div className="font-medium">Auto-Save</div>
                          <div className="text-sm text-slate-400">Automatically save your progress</div>
                        </div>
                        <button className="w-12 h-6 rounded-full bg-primary relative transition-colors">
                          <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white transition-all"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-slate-400">Receive updates about shared stories</div>
                        </div>
                        <button className="w-12 h-6 rounded-full bg-slate-700 relative transition-colors">
                          <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === 'profile' && (
              <div className="max-w-3xl">
                <div className="mb-10">
                  <h2 className="text-4xl font-black tracking-tight mb-2">Profile</h2>
                  <p className="text-slate-400">Manage your public profile and author details.</p>
                </div>
                
                <form 
                  className="bg-surface-dark border border-border-dark rounded-2xl p-8"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!user) return;
                    const formData = new FormData(e.currentTarget);
                    const displayName = formData.get('displayName') as string;
                    const bio = formData.get('bio') as string;
                    
                    try {
                      const { doc, updateDoc } = await import('firebase/firestore');
                      await updateDoc(doc(db, 'users', user.uid), {
                        displayName,
                        bio
                      });
                      showToast('Profile updated successfully!', 'success');
                    } catch (error) {
                      console.error('Error updating profile:', error);
                      showToast('Failed to update profile.', 'error');
                    }
                  }}
                >
                  <div className="flex items-start gap-8 mb-8">
                    <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-surface-dark shadow-xl relative overflow-hidden group">
                      <img src={userProfile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`} alt="Avatar" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-xs font-bold text-white">Change Avatar</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Display Name</label>
                        <input name="displayName" type="text" defaultValue={userProfile?.displayName || ''} className="w-full bg-bg-dark border border-border-dark rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bio</label>
                        <textarea name="bio" rows={3} defaultValue={userProfile?.bio || ''} className="w-full bg-bg-dark border border-border-dark rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors resize-none" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-border-dark">
                    <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-bold transition-colors">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
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
            {aiRecommendations.length > 0 ? aiRecommendations.map((rec, i) => (
              <div key={i} className="p-4 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer group">
                <p className="text-sm font-medium leading-relaxed text-slate-300">"{rec.text}"</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary uppercase">{rec.type}</span>
                </div>
              </div>
            )) : (
              <>
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
              </>
            )}
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

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            {toast.type === 'success' ? <Plus size={14} /> : <Plus size={14} className="rotate-45" />}
          </div>
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
