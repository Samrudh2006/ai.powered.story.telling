import React, { useState } from 'react';
import { Search, Plus, Sparkles, Share, Edit3, User, Activity, Clock, Map, FileText, ChevronRight, Zap } from 'lucide-react';

export default function LoreForge() {
  const [activeCharacter, setActiveCharacter] = useState('elias');

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0A0B10] text-gray-300 font-sans">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 bg-[#0F111A] flex flex-col shrink-0">
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search characters..." 
              className="w-full bg-[#1A1C23] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-4">
            <div className="text-[10px] font-bold text-gray-500 tracking-wider mb-3 px-2 uppercase">Main Cast</div>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveCharacter('elias')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeCharacter === 'elias' ? 'bg-indigo-500/10 border border-indigo-500/20' : 'hover:bg-white/5 border border-transparent'}`}
              >
                <div className="w-8 h-8 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: 'url(https://picsum.photos/seed/elias/100/100)' }}></div>
                <div className="text-left">
                  <div className={`text-sm font-bold ${activeCharacter === 'elias' ? 'text-indigo-400' : 'text-white'}`}>Elias Thorne</div>
                  <div className="text-[10px] text-indigo-500/70 uppercase tracking-wider">Protagonist</div>
                </div>
              </button>
              <button 
                onClick={() => setActiveCharacter('lyra')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeCharacter === 'lyra' ? 'bg-indigo-500/10 border border-indigo-500/20' : 'hover:bg-white/5 border border-transparent'}`}
              >
                <div className="w-8 h-8 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: 'url(https://picsum.photos/seed/lyra/100/100)' }}></div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-300">Lyra Vance</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Deuteragonist</div>
                </div>
              </button>
              <button 
                onClick={() => setActiveCharacter('varkas')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeCharacter === 'varkas' ? 'bg-indigo-500/10 border border-indigo-500/20' : 'hover:bg-white/5 border border-transparent'}`}
              >
                <div className="w-8 h-8 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: 'url(https://picsum.photos/seed/varkas/100/100)' }}></div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-300">Commander Varkas</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Antagonist</div>
                </div>
              </button>
            </div>
          </div>

          <div className="px-3 py-2">
            <div className="text-[10px] font-bold text-gray-500 tracking-wider mb-3 px-2 uppercase">Supporting</div>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent transition-colors">
                <div className="w-8 h-8 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: 'url(https://picsum.photos/seed/sera/100/100)' }}></div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-300">Sera Fray</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Merchant</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors text-sm font-medium text-white">
            <Plus size={16} />
            New Character
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="flex items-start gap-8">
            <div className="w-48 h-48 rounded-2xl bg-cover bg-center border border-white/10 shadow-2xl shrink-0 relative overflow-hidden group" style={{ backgroundImage: 'url(https://picsum.photos/seed/elias/400/400)' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <button className="w-full py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded text-xs font-bold text-white transition-colors">Update Portrait</button>
              </div>
            </div>
            
            <div className="flex-1 pt-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Elias Thorne</h1>
                    <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Protagonist</span>
                  </div>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                    A former archivist turned revolutionary after discovering suppressed history. Driven by a relentless need for truth but haunted by the moral cost of rebellion.
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-medium text-white transition-colors">
                    <Sparkles size={16} className="text-indigo-400" />
                    AI Refresh
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-medium text-white transition-colors">
                    <Share size={16} />
                    Export
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-3 gap-6">
            
            {/* Core Traits */}
            <div className="col-span-1 bg-[#12131A] border border-white/5 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <Activity size={18} className="text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">Core Traits</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium mb-2">
                    <span className="text-gray-400">Pragmatism vs Idealism</span>
                    <span className="text-white">65%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-xs font-medium mb-2">
                    <span className="text-gray-400">Mercy vs Justice</span>
                    <span className="text-white">42%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-xs font-medium mb-2">
                    <span className="text-gray-400">Stability vs Chaos</span>
                    <span className="text-white">88%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Character Arc Timeline */}
            <div className="col-span-2 bg-[#12131A] border border-white/5 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-8">
                <Clock size={18} className="text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">Character Arc Timeline</h3>
              </div>
              
              <div className="relative pt-4 pb-8">
                {/* Timeline Line */}
                <div className="absolute top-6 left-4 right-4 h-0.5 bg-white/10"></div>
                
                <div className="flex justify-between relative z-10">
                  {/* Point 1 */}
                  <div className="flex flex-col items-center w-32 -ml-16">
                    <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Act I</div>
                    <div className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-[#12131A] mb-3"></div>
                    <div className="text-sm font-bold text-white mb-1 text-center">The Discovery</div>
                    <div className="text-xs text-gray-500 text-center">Archival Basement</div>
                  </div>
                  
                  {/* Point 2 */}
                  <div className="flex flex-col items-center w-32 -ml-16">
                    <div className="text-[10px] font-bold text-transparent mb-2 uppercase tracking-wider">-</div>
                    <div className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-[#12131A] mb-3"></div>
                    <div className="text-sm font-bold text-white mb-1 text-center">Exile</div>
                    <div className="text-xs text-gray-500 text-center">Outer Rim Settlement</div>
                  </div>
                  
                  {/* Point 3 (Current) */}
                  <div className="flex flex-col items-center w-32 -ml-16">
                    <div className="text-[10px] font-bold text-indigo-400 mb-2 uppercase tracking-wider">Current</div>
                    <div className="w-5 h-5 rounded-full bg-indigo-500 border-4 border-[#12131A] shadow-[0_0_15px_rgba(99,102,241,0.5)] mb-2"></div>
                    <div className="text-sm font-bold text-indigo-400 mb-1 text-center">The Uprising</div>
                    <div className="text-xs text-gray-400 text-center">Capital City</div>
                  </div>
                  
                  {/* Point 4 */}
                  <div className="flex flex-col items-center w-32 -mr-16">
                    <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Act III</div>
                    <div className="w-3 h-3 rounded-full bg-gray-700 border-2 border-[#12131A] mb-3"></div>
                    <div className="text-sm font-bold text-gray-500 mb-1 text-center">Redemption?</div>
                    <div className="text-xs text-gray-600 text-center">The High Spire</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Physicality */}
            <div className="col-span-1 bg-[#12131A] border border-white/5 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <User size={18} className="text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">Physicality</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-sm text-gray-500">Build</span>
                  <span className="text-sm font-medium text-white">Wiry, Athletic</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-sm text-gray-500">Height</span>
                  <span className="text-sm font-medium text-white">182 cm</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-sm text-gray-500">Eyes</span>
                  <span className="text-sm font-medium text-white">Steel Grey</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm text-gray-500">Distinguishing</span>
                  <span className="text-sm font-medium text-white text-right">Ink stain on left<br/>palm</span>
                </div>
              </div>
            </div>

            {/* Branch Consistency */}
            <div className="col-span-1 bg-[#12131A] border border-white/5 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <GitBranch size={18} className="text-indigo-400" />
                  <h3 className="text-sm font-bold text-white tracking-wide">Branch Consistency</h3>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  94% Match
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="text-sm font-medium text-white">Branch A: Prime</span>
                  </div>
                  <span className="text-[10px] font-bold text-green-400 tracking-wider">ALIVE</span>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/5 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    <span className="text-sm font-medium text-gray-300">Branch B: Fallen King</span>
                  </div>
                  <span className="text-[10px] font-bold text-red-400 tracking-wider">DECEASED</span>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm font-medium text-white">Branch C: Renegade</span>
                  </div>
                  <span className="text-[10px] font-bold text-yellow-500 tracking-wider">IN HIDING</span>
                </div>
              </div>
            </div>

            {/* Relationship Map */}
            <div className="col-span-1 bg-[#12131A] border border-white/5 rounded-2xl p-6 shadow-lg flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Map size={18} className="text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">Relationship Map</h3>
              </div>
              
              <div className="flex-1 bg-[#0A0B10] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center min-h-[160px]">
                {/* Simplified Map Visualization */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path d="M 120 80 L 60 40" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <path d="M 120 80 L 180 50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <path d="M 120 80 L 150 130" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                </svg>
                
                <div className="absolute top-[30px] left-[40px] w-10 h-10 rounded-full bg-cover bg-center border-2 border-indigo-500/50" style={{ backgroundImage: 'url(https://picsum.photos/seed/lyra/100/100)' }}></div>
                <div className="absolute top-[40px] right-[40px] w-10 h-10 rounded-full bg-cover bg-center border-2 border-red-500/50" style={{ backgroundImage: 'url(https://picsum.photos/seed/varkas/100/100)' }}></div>
                <div className="absolute bottom-[20px] right-[60px] w-10 h-10 rounded-full bg-cover bg-center border-2 border-gray-500/50" style={{ backgroundImage: 'url(https://picsum.photos/seed/sera/100/100)' }}></div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-cover bg-center border-2 border-indigo-500 z-10 shadow-[0_0_15px_rgba(99,102,241,0.3)]" style={{ backgroundImage: 'url(https://picsum.photos/seed/elias/100/100)' }}></div>
              </div>
            </div>

            {/* Background Narrative */}
            <div className="col-span-3 bg-[#12131A] border border-white/5 rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-indigo-400" />
                  <h3 className="text-sm font-bold text-white tracking-wide">Background Narrative</h3>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/20"></div>
                </div>
              </div>
              
              <div className="text-gray-300 leading-relaxed space-y-4 text-sm">
                <p>
                  Born in the subterranean districts of <span className="text-indigo-400 cursor-pointer hover:underline">Oakhaven</span>, Elias was never meant for the surface world. His childhood was spent cataloging the 'Great Decline' for the Ministry of Records. This intimate knowledge of what was lost fueled a quiet resentment that finally boiled over when he discovered <span className="italic text-white">The Crimson Protocol</span>—a direct order from the Council to erase the history of the First Rebellion.
                </p>
                <p>
                  Currently, he operates as 'The Ghost' within the capital city's underbelly, using his knowledge of the old archives to bypass modern security systems. He struggles with the violent methods of his allies, preferring precision strikes over collateral damage.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
