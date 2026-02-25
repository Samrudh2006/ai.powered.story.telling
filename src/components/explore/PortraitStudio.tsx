import React, { useState } from 'react';
import { RefreshCw, LayoutGrid, List, ChevronDown, Check, Image as ImageIcon } from 'lucide-react';

export default function PortraitStudio() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [style, setStyle] = useState('oil');
  const [mood, setMood] = useState('melancholic');

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0A0B10] text-gray-300 font-sans">
      {/* Sidebar Controls */}
      <div className="w-80 border-r border-white/5 bg-[#0F111A] flex flex-col shrink-0 overflow-y-auto">
        
        {/* Physical Traits */}
        <div className="p-6 border-b border-white/5">
          <div className="text-[10px] font-bold text-indigo-400 tracking-wider mb-3 uppercase">Physical Traits</div>
          <textarea 
            rows={4}
            className="w-full bg-[#1A1C23] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            placeholder="Describe features, hair, eyes, scars, clothing... (e.g. A weary knight with silver hair and a jagged scar across the left eye)"
            defaultValue="A weary knight with silver hair and a jagged scar across the left eye"
          ></textarea>
        </div>

        {/* Artistic Style */}
        <div className="p-6 border-b border-white/5">
          <div className="text-[10px] font-bold text-indigo-400 tracking-wider mb-3 uppercase">Artistic Style</div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setStyle('oil')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${style === 'oil' ? 'bg-indigo-600 text-white' : 'bg-[#1A1C23] border border-white/10 text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-orange-400 to-red-500"></div>
              Oil Painting
            </button>
            <button 
              onClick={() => setStyle('digital')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${style === 'digital' ? 'bg-indigo-600 text-white' : 'bg-[#1A1C23] border border-white/10 text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500"></div>
              Digital Art
            </button>
            <button 
              onClick={() => setStyle('sketch')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${style === 'sketch' ? 'bg-indigo-600 text-white' : 'bg-[#1A1C23] border border-white/10 text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-gray-400 to-gray-600"></div>
              Sketch
            </button>
            <button 
              onClick={() => setStyle('cinematic')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${style === 'cinematic' ? 'bg-indigo-600 text-white' : 'bg-[#1A1C23] border border-white/10 text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500"></div>
              Cinematic
            </button>
          </div>
        </div>

        {/* Mood & Atmosphere */}
        <div className="p-6 border-b border-white/5">
          <div className="text-[10px] font-bold text-indigo-400 tracking-wider mb-3 uppercase">Mood & Atmosphere</div>
          <input 
            type="text" 
            placeholder="Melancholic, Heroic, Eerie..." 
            className="w-full bg-[#1A1C23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors mb-3"
            defaultValue="Melancholic, Dark Fantasy"
          />
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setMood('melancholic')}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-colors uppercase tracking-wider ${mood === 'melancholic' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'border-white/10 text-gray-500 hover:text-gray-300'}`}
            >
              Melancholic
            </button>
            <button 
              onClick={() => setMood('dark_fantasy')}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-colors uppercase tracking-wider ${mood === 'dark_fantasy' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'border-white/10 text-gray-500 hover:text-gray-300'}`}
            >
              Dark Fantasy
            </button>
            <button 
              onClick={() => setMood('mysterious')}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-colors uppercase tracking-wider ${mood === 'mysterious' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'border-white/10 text-gray-500 hover:text-gray-300'}`}
            >
              Mysterious
            </button>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="p-6">
          <button className="w-full flex items-center justify-between text-xs font-bold text-gray-500 tracking-wider uppercase hover:text-gray-300 transition-colors">
            Advanced Settings
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Generate Button */}
        <div className="mt-auto p-6 bg-[#0F111A] border-t border-white/5 sticky bottom-0 z-10">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors text-sm font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
            ) : (
              <>
                <RefreshCw size={18} />
                Generate Portraits
              </>
            )}
          </button>
          <div className="text-center text-[10px] font-medium text-gray-500 mt-3 uppercase tracking-wider">
            Consumes 1 Creation Credit
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        
        {/* Header */}
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0A0B10]/80 backdrop-blur-sm z-10 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Generated Results</h2>
            <div className="text-sm text-gray-400">Found 4 variations based on your creative prompt.</div>
          </div>
          
          <div className="flex items-center gap-2 bg-[#1A1C23] border border-white/10 rounded-lg p-1">
            <button className="p-2 rounded-md bg-white/10 text-white shadow-sm">
              <LayoutGrid size={18} />
            </button>
            <button className="p-2 rounded-md text-gray-500 hover:text-white transition-colors">
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Image 1 */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden bg-[#12131A] border border-white/5 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/king/800/800" 
                alt="Generated Portrait 1" 
                className={`w-full h-full object-cover transition-transform duration-700 ${isGenerating ? 'opacity-50 blur-sm scale-105' : 'group-hover:scale-105'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                  <div className="text-white font-medium">Variation A</div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white transition-colors">
                      <Check size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 2 */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden bg-[#12131A] border border-white/5 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/warrior/800/800" 
                alt="Generated Portrait 2" 
                className={`w-full h-full object-cover transition-transform duration-700 ${isGenerating ? 'opacity-50 blur-sm scale-105' : 'group-hover:scale-105'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                  <div className="text-white font-medium">Variation B</div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white transition-colors">
                      <Check size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 3 */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden bg-[#12131A] border border-white/5 shadow-2xl flex items-center justify-center">
              {isGenerating ? (
                <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
              ) : (
                <img 
                  src="https://picsum.photos/seed/empty/800/800?blur=10" 
                  alt="Generated Portrait 3" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Image 4 */}
            <div className="group relative aspect-square rounded-2xl overflow-hidden bg-[#12131A] border border-white/5 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/wizard/800/800" 
                alt="Generated Portrait 4" 
                className={`w-full h-full object-cover transition-transform duration-700 ${isGenerating ? 'opacity-50 blur-sm scale-105' : 'group-hover:scale-105'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                  <div className="text-white font-medium">Variation D</div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white transition-colors">
                      <Check size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="h-10 border-t border-white/5 bg-[#0F111A] flex items-center justify-between px-6 shrink-0 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              AI Engine Online: GPT-V4 & Diffusion XL
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw size={12} />
              Average Gen Time: 8.4s
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Support Documentation</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Creation</a>
          </div>
        </div>

      </div>
    </div>
  );
}
