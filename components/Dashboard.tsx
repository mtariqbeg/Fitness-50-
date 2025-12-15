import React, { useState } from 'react';
import { UserProfile, WeightLossPlan } from '../types';
import { PlanCard } from './PlanCard';
import { LocalFinder } from './LocalFinder';
import { Calendar, MapPin, Award, Leaf, Wheat, Flame, Target } from 'lucide-react';

interface DashboardProps {
  plan: WeightLossPlan;
  profile: UserProfile;
  onReset: () => void;
}

type Tab = 'PLAN' | 'LOCAL' | 'COACH';

export const Dashboard: React.FC<DashboardProps> = ({ plan, profile, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>('PLAN');

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <header className="bg-prime-900 text-white sticky top-0 z-50 shadow-xl backdrop-blur-md bg-opacity-95">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-energetic-500 to-energetic-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg border border-white/10">
              P
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold leading-none tracking-tight">PrimeVitality</h1>
              <p className="text-xs text-prime-200 uppercase tracking-widest font-medium mt-0.5">Age {profile.age} • {profile.location}</p>
            </div>
          </div>
          <button 
            onClick={onReset}
            className="text-sm text-prime-200 hover:text-white font-medium transition-colors px-3 py-1 rounded-md hover:bg-white/10"
          >
            Start New Plan
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Welcome Hero Banner */}
        <section className="mb-12 relative rounded-3xl overflow-hidden shadow-2xl group">
            {/* Background Image */}
            <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80"
                alt="Healthy fresh food"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-prime-900/95 via-prime-900/80 to-prime-800/40" />
            
            <div className="relative z-10 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-prime-50 text-xs font-bold uppercase tracking-widest mb-6 border border-white/20 shadow-sm">
                        <Award className="w-3 h-3 text-energetic-500" />
                        <span>Your Personalized Journey</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-sm">
                        Reclaiming Vitality, <br/>
                        <span className="text-energetic-500">One Day at a Time.</span>
                    </h2>
                    <div className="flex items-start gap-4">
                        <div className="hidden md:block w-1 h-12 bg-energetic-500 rounded-full opacity-80"></div>
                        <p className="text-lg md:text-xl text-prime-100 italic font-serif leading-relaxed opacity-90">
                            "{plan.motivationalQuote}"
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* High Level Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow group">
                <div className="inline-block p-3 bg-prime-50 rounded-full mb-3 group-hover:bg-prime-100 transition-colors">
                    <Flame className="w-6 h-6 text-prime-500" />
                </div>
                <p className="text-3xl font-serif font-bold text-slate-800 mb-1">{plan.dailyCalories}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Calories / Day</p>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow group">
                 <div className="inline-block p-3 bg-emerald-50 rounded-full mb-3 group-hover:bg-emerald-100 transition-colors">
                    <Wheat className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-3xl font-serif font-bold text-emerald-700 mb-1">{plan.proteinTarget}g</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Protein Target</p>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow group">
                 <div className="inline-block p-3 bg-indigo-50 rounded-full mb-3 group-hover:bg-indigo-100 transition-colors">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-3xl font-serif font-bold text-indigo-700 mb-1">7</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Day Reset</p>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow group">
                 <div className="inline-block p-3 bg-rose-50 rounded-full mb-3 group-hover:bg-rose-100 transition-colors">
                    <Target className="w-6 h-6 text-rose-500" />
                </div>
                <p className="text-3xl font-serif font-bold text-rose-600 mb-1">{Math.max(0, profile.currentWeight - profile.targetWeight)}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Lbs to lose</p>
            </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex relative">
                <button 
                    onClick={() => setActiveTab('PLAN')}
                    className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'PLAN' ? 'bg-prime-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <Calendar className="w-5 h-5" />
                    <span>My Plan</span>
                </button>
                <button 
                    onClick={() => setActiveTab('LOCAL')}
                    className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'LOCAL' ? 'bg-prime-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <MapPin className="w-5 h-5" />
                    <span>Local Gems</span>
                </button>
            </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
            {activeTab === 'PLAN' && (
                <div className="space-y-10">
                     <div className="bg-white border border-indigo-100 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full opacity-50 pointer-events-none"></div>
                        <h3 className="text-2xl font-serif font-bold text-indigo-900 mb-6 flex items-center gap-2">
                             Summary & Strategy
                        </h3>
                        <p className="text-slate-700 leading-relaxed text-lg mb-8 max-w-4xl relative z-10">{plan.summary}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100 hover:border-emerald-200 transition-colors">
                                <h4 className="flex items-center gap-2 font-bold text-emerald-800 mb-4 text-lg">
                                    <div className="p-2 bg-emerald-100 rounded-lg"><Leaf className="w-5 h-5 text-emerald-600" /></div>
                                    Seasonal Fresh Picks
                                </h4>
                                <ul className="space-y-2">
                                    {plan.seasonalProduce.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-100 hover:border-amber-200 transition-colors">
                                <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-4 text-lg">
                                    <div className="p-2 bg-amber-100 rounded-lg"><Wheat className="w-5 h-5 text-amber-600" /></div>
                                    Power Nuts & Seeds
                                </h4>
                                <ul className="space-y-2">
                                    {plan.recommendedNutsSeeds.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {plan.tips.map((tip, i) => (
                                <span key={i} className="px-4 py-2 bg-white text-indigo-700 text-sm font-bold rounded-full border border-indigo-100 shadow-sm flex items-center gap-2">
                                    <span className="text-energetic-500">★</span> {tip}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plan.weeklyPlan.map((day, idx) => (
                            <PlanCard key={idx} dayPlan={day} index={idx} />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'LOCAL' && (
                <LocalFinder location={profile.location} />
            )}
        </div>

      </main>
    </div>
  );
};