import React, { useState } from 'react';
import { Search, Plus, Users, LayoutGrid, List, Sparkles, GitBranch, Settings, Map, ZoomIn, ZoomOut, Maximize, ChevronRight } from 'lucide-react';

export default function StoryBranch() {
  const [showMergeModal, setShowMergeModal] = useState(false);

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0A0B10] text-gray-300 font-sans">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 bg-[#0F111A] flex flex-col shrink-0">
        <div className="p-5">
          <div className="text-xs font-semibold text-gray-500 tracking-wider mb-2">ACTIVE PROJECT</div>
          <div className="text-lg font-bold text-white">Project Alpha: Awakening</div>
        </div>

        <div className="px-3 py-2">
          <div className="text-xs font-semibold text-gray-500 tracking-wider mb-3 px-2">TIMELINES</div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">
              <Sparkles size={16} />
              Main Narrative
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 transition-colors">
              <List size={16} />
              Drafts & Ideas
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 transition-colors">
              <GitBranch size={16} />
              Alternate Realities
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 transition-colors">
              <div className="flex items-center gap-3">
                <Settings size={16} />
                AI Suggestions
              </div>
              <span className="bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">12</span>
            </button>
          </div>
        </div>

        <div className="px-3 py-4 mt-4">
          <div className="text-xs font-semibold text-gray-500 tracking-wider mb-3 px-2">CHARACTERS</div>
          <div className="flex items-center gap-1 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-[#0F111A] -mr-2 z-30"></div>
            <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-[#0F111A] -mr-2 z-20"></div>
            <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-[#0F111A] -mr-2 z-10"></div>
            <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#0F111A] flex items-center justify-center text-xs font-medium text-white z-0">+5</div>
          </div>
        </div>

        <div className="mt-auto p-4">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium text-white">
            <Users size={16} />
            Collaborators
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0A0B10]/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Projects</span>
            <ChevronRight size={14} className="text-gray-600" />
            <span className="text-white font-medium">The Hero's Path</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search nodes or characters..." 
                className="w-64 bg-[#1A1C23] border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <button 
              onClick={() => setShowMergeModal(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              New Branch
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-[#0A0B10]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
          
          {/* Legend */}
          <div className="absolute top-6 left-6 flex items-center gap-4 bg-[#1A1C23] border border-white/10 rounded-full px-4 py-1.5 text-xs font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-gray-300">MAIN PLOT</span>
            </div>
            <div className="w-px h-3 bg-white/10"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full border border-indigo-500"></div>
              <span className="text-gray-400">AI BRANCH</span>
            </div>
          </div>

          {/* Nodes (Static representation for visual match) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M 150 200 L 300 200" stroke="#4F46E5" strokeWidth="2" fill="none" />
              <path d="M 450 200 L 600 200" stroke="#4F46E5" strokeWidth="2" fill="none" />
              <path d="M 750 200 L 900 200" stroke="#4F46E5" strokeWidth="2" fill="none" />
              
              {/* Branch up */}
              <path d="M 375 200 C 375 100, 450 100, 550 100" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.5" />
              
              {/* Branch down */}
              <path d="M 675 200 C 675 300, 750 300, 850 300" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.5" />
            </svg>

            {/* Chapter 1 */}
            <div className="absolute left-0 top-[160px] w-48 bg-[#12131A] border border-indigo-500 rounded-xl p-4 shadow-lg z-10">
              <div className="text-[10px] font-bold text-indigo-500 tracking-wider mb-1 uppercase">Chapter 1</div>
              <div className="text-sm font-bold text-white mb-3">Cold Opening</div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Users size={12} />
                User: Alex
              </div>
            </div>

            {/* Branch Point */}
            <div className="absolute left-[300px] top-[160px] w-48 bg-[#12131A] border border-indigo-500 rounded-xl p-4 shadow-lg z-10">
              <div className="text-[10px] font-bold text-indigo-500 tracking-wider mb-1 uppercase">Branch Point</div>
              <div className="text-sm font-bold text-white mb-3">The Mysterious Stranger</div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Users size={12} />
                User: Alex
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="absolute left-[600px] top-[160px] w-48 bg-[#12131A] border border-indigo-500 rounded-xl p-4 shadow-lg z-10">
              <div className="text-[10px] font-bold text-indigo-500 tracking-wider mb-1 uppercase">Chapter 2</div>
              <div className="text-sm font-bold text-white mb-3">Journey to the East</div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Users size={12} />
                User: Sarah
              </div>
            </div>

            {/* AI Suggestion Up */}
            <div className="absolute left-[550px] top-[60px] w-48 bg-[#12131A] border border-indigo-500/30 border-dashed rounded-xl p-4 shadow-lg z-10">
              <div className="text-[10px] font-bold text-indigo-400 tracking-wider mb-1 uppercase">AI Suggestion</div>
              <div className="text-sm font-bold text-white mb-3">The Secret Pact</div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Sparkles size={12} />
                GPT-4o
              </div>
            </div>

            {/* AI Suggestion Down */}
            <div className="absolute left-[850px] top-[260px] w-48 bg-[#12131A] border border-indigo-500/30 border-dashed rounded-xl p-4 shadow-lg z-10">
              <div className="text-[10px] font-bold text-indigo-400 tracking-wider mb-1 uppercase">AI Suggestion</div>
              <div className="text-sm font-bold text-white mb-3">Ambush at Night</div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Sparkles size={12} />
                GPT-4o
              </div>
            </div>
          </div>

          {/* Minimap */}
          <div className="absolute bottom-6 left-6 w-48 h-32 bg-[#12131A] border border-white/10 rounded-xl overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-full h-full relative p-2">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '8px 8px' }}></div>
              {/* Minimap representation */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 border border-indigo-500/50 rounded flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <div className="bg-[#1A1C23] border border-white/10 rounded-lg overflow-hidden flex flex-col">
              <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-b border-white/10">
                <ZoomIn size={18} />
              </button>
              <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-b border-white/10">
                <ZoomOut size={18} />
              </button>
              <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <Maximize size={18} />
              </button>
            </div>
            <button className="p-2.5 bg-[#1A1C23] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              <Map size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Merge Modal Overlay */}
      {showMergeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-[#12131A] border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 mt-1">
                  <GitBranch size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Merge Branch</h2>
                  <div className="text-sm text-gray-400">
                    Comparing <span className="text-indigo-400 font-mono text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">feature/ai-plot-twist</span> into <span className="text-gray-300 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">main</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  1 Conflict Found
                </div>
                <button onClick={() => setShowMergeModal(false)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>
            </div>

            {/* AI Summary */}
            <div className="px-6 py-4 border-b border-white/10 bg-[#1A1C23]/50 flex items-center gap-4">
              <div className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase border border-indigo-500/30 px-2 py-1 rounded">AI Summary</div>
              <div className="text-sm text-gray-300 italic">"This branch introduces a pivotal dialogue between Elara and the Keeper, revealing the origins of the Chronos Shard."</div>
            </div>

            {/* Diff View */}
            <div className="flex-1 overflow-y-auto p-6 flex gap-6">
              {/* Left Column - Current */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-gray-500 tracking-wider uppercase">Current Main Plot</div>
                  <div className="text-xs text-gray-500 font-mono">v1.2.4</div>
                </div>
                
                <div className="text-sm text-gray-300 leading-relaxed space-y-4">
                  <p>Elara stood before the heavy iron gates of the Citadel. The wind howled through the canyon, carrying the scent of rain and ozone. She tightened her grip on the hilt of her sword, feeling the cold steel through her leather gloves.</p>
                  
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-lg"></div>
                    <div className="text-[10px] font-bold text-red-400 tracking-wider uppercase mb-2">- Removed</div>
                    <p className="text-red-200">She waited for a sign from the scouts, but only the silence of the valley answered her. Her heart hammered against her ribs like a trapped bird.</p>
                  </div>

                  <p>The gates groaned as they began to swing inward, revealing a courtyard shrouded in mist. A single figure stood at the center, silhouetted against the pale moonlight.</p>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 rounded-l-lg"></div>
                    <div className="text-[10px] font-bold text-yellow-500 tracking-wider uppercase mb-2">! Conflicting Area</div>
                    <p className="text-yellow-200">"I've been expecting you, Elara," the figure said, its voice echoing with a strange, metallic resonance. "The Shard is not for mortals to command."</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Incoming */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-indigo-400 tracking-wider uppercase">Selected Branch (AI Twist)</div>
                  <div className="text-xs text-indigo-400/70 font-mono">Incoming</div>
                </div>

                <div className="text-sm text-gray-300 leading-relaxed space-y-4">
                  <p>Elara stood before the heavy iron gates of the Citadel. The wind howled through the canyon, carrying the scent of rain and ozone. She tightened her grip on the hilt of her sword, feeling the cold steel through her leather gloves.</p>
                  
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500 rounded-l-lg"></div>
                    <div className="text-[10px] font-bold text-green-400 tracking-wider uppercase mb-2">+ Added</div>
                    <p className="text-green-200">She didn't need a sign from the scouts; she could feel the resonance of the Chronos Shard pulsing from deep within the stone walls. It hummed in her marrow, a song of lost time.</p>
                  </div>

                  <p>The gates groaned as they began to swing inward, revealing a courtyard shrouded in mist. A single figure stood at the center, silhouetted against the pale moonlight.</p>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 rounded-l-lg"></div>
                    <div className="text-[10px] font-bold text-yellow-500 tracking-wider uppercase mb-2">! Conflicting Area</div>
                    <p className="text-yellow-200">"You are late," the Keeper hissed, stepping from the shadows. "The timeline is already fraying at the edges, and your presence only accelerates the decay."</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resolution Area */}
            <div className="p-6 border-t border-white/10 bg-[#1A1C23]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-bold text-white">Resolve Conflict: Paragraph 4</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors">Keep Current</button>
                  <button className="px-3 py-1.5 rounded border border-indigo-500/50 bg-indigo-500/10 text-sm font-medium text-indigo-400 hover:bg-indigo-500/20 transition-colors">Use Branch</button>
                  <button className="px-3 py-1.5 rounded border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors">Manual Edit</button>
                </div>
              </div>
              
              <div className="bg-[#0A0B10] border border-white/10 rounded-lg p-4 text-sm text-gray-300 relative">
                <p>"I've been expecting you, Elara," the Keeper hissed, stepping from the shadows. "The timeline is already fraying at the edges, and your presence only accelerates the decay of the Shard."</p>
                <div className="absolute bottom-2 right-4 text-[10px] text-gray-500">
                  AI Suggestion: <span className="text-indigo-400 cursor-pointer hover:underline">Merge both dialogues</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 flex items-center justify-between bg-[#12131A]">
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-green-400">
                  <div className="w-2 h-2 border border-green-500 rounded-sm"></div>
                  1 Addition
                </div>
                <div className="flex items-center gap-1.5 text-red-400">
                  <div className="w-2 h-2 border border-red-500 rounded-sm"></div>
                  1 Removal
                </div>
                <div className="flex items-center gap-1.5 text-yellow-500">
                  <div className="w-2 h-2 border border-yellow-500 rounded-sm"></div>
                  1 Conflict
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowMergeModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
                <button className="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors">Preview Merge</button>
                <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin hidden"></div>
                  Confirm Merge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
