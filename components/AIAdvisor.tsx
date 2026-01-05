
import React, { useState, useEffect } from 'react';
import { Sparkles, DollarSign, MapPin, Calculator, Loader2, ExternalLink } from 'lucide-react';
import { getCarSuggestions } from '../services/geminiService';

const AIAdvisor: React.FC = () => {
  const [budget, setBudget] = useState<number>(30000);
  const [needs, setNeeds] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{text: string, sources: any[] | null}>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.log('Location access denied', err)
    );
  }, []);

  const handleConsult = async () => {
    if (!needs) return;
    setLoading(true);
    try {
      const data = await getCarSuggestions(budget, needs, location || undefined);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 space-y-6">
      <div className="bg-gradient-to-br from-brand-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-brand-200" size={32} />
          <h2 className="text-2xl font-bold">Drivecore AI Advisor</h2>
        </div>
        <p className="text-brand-100 mb-6">Expert car match-making powered by Gemini. Finding the best choice for your budget.</p>
        
        <div className="space-y-4">
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Budget ($)</label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="1000" 
                max="250000" 
                step="5000"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="flex-1 accent-white"
              />
              <span className="font-mono font-bold text-lg w-24 text-right">${budget.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Tell us what you need</label>
            <textarea 
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-orange-200 resize-none h-24"
              placeholder="e.g. A fast but reliable daily driver with low maintenance costs..."
              value={needs}
              onChange={(e) => setNeeds(e.target.value)}
            />
          </div>

          <button 
            onClick={handleConsult}
            disabled={loading || !needs}
            className="w-full bg-white text-brand-700 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            Analyze My Options
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 dark:text-slate-100">
            <Sparkles className="text-brand-600" size={20} />
            Drivecore Insights
          </h3>
          <div className="prose prose-sm max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
            {result.text}
          </div>
          
          {result.sources && result.sources.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 mb-3">Nearby Recommended Dealers</h4>
              <div className="space-y-2">
                {result.sources.map((chunk: any, i: number) => (
                  chunk.maps && (
                    <a 
                      key={i} 
                      href={chunk.maps.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="text-brand-500" size={18} />
                        <span className="font-medium text-sm dark:text-slate-200">{chunk.maps.title}</span>
                      </div>
                      <ExternalLink size={14} className="text-slate-400 group-hover:text-brand-500" />
                    </a>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAdvisor;
