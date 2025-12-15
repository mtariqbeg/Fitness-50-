import React, { useState } from 'react';
import { findLocalWellnessSpots, LocalResourcesResponse } from '../services/geminiService';
import { MapPin, Search, Loader2, Navigation } from 'lucide-react';

interface LocalFinderProps {
  location: string;
}

export const LocalFinder: React.FC<LocalFinderProps> = ({ location }) => {
  const [query, setQuery] = useState('parks for walking');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LocalResourcesResponse | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await findLocalWellnessSpots(location, query);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-energetic-500 rounded-full text-white">
          <MapPin size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-prime-900">Local Wellness Discovery</h2>
          <p className="text-slate-500">Find places in {location} to support your journey.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Swimming pools, Healthy grocery, Walking trails"
          className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-prime-500 focus:border-prime-500 outline-none text-lg"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-8 py-3 bg-prime-800 text-white rounded-lg font-bold shadow-md hover:bg-prime-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
          <span>Discover</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
            {['Walking Trails', 'Senior Yoga', 'Farmers Markets', 'Swimming Pools'].map(tag => (
                <button 
                    key={tag}
                    onClick={() => { setQuery(tag); }}
                    className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-prime-100 hover:text-prime-800 transition-colors text-sm font-medium"
                >
                    {tag}
                </button>
            ))}
        </div>
      </div>

      {result && (
        <div className="mt-8 animate-fade-in space-y-6">
          <div className="prose prose-slate max-w-none text-slate-700 bg-slate-50 p-6 rounded-lg border border-slate-100">
            <h3 className="text-lg font-serif font-bold text-prime-800 mb-2">Suggestions</h3>
            <p className="whitespace-pre-wrap leading-relaxed">{result.answer}</p>
          </div>

          {result.places && result.places.length > 0 && (
            <div>
               <h3 className="text-lg font-serif font-bold text-prime-800 mb-4 flex items-center gap-2">
                 <Navigation className="w-5 h-5" />
                 Map Links
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {result.places.map((place, idx) => (
                   <a 
                     key={idx} 
                     href={place.uri} 
                     target="_blank" 
                     rel="noreferrer"
                     className="block p-4 bg-white border border-slate-200 rounded-lg hover:border-prime-500 hover:shadow-md transition-all group"
                   >
                     <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-800 group-hover:text-prime-600">{place.title}</span>
                        <MapPin className="w-4 h-4 text-slate-400 group-hover:text-prime-500" />
                     </div>
                   </a>
                 ))}
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
