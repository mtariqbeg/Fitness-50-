import React, { useState } from 'react';
import { UserProfile, WeightLossPlan } from '../types';
import { PlanCard } from './PlanCard';
import { LocalFinder } from './LocalFinder';
import { Calendar, MapPin, Award, Leaf, Wheat } from 'lucide-react';

interface DashboardProps {
  plan: WeightLossPlan;
  profile: UserProfile;
  onReset: () => void;
}

type Tab = 'PLAN' | 'LOCAL' | 'COACH';

export const Dashboard: React.FC<DashboardProps> = ({ plan, profile, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>('PLAN');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-prime-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-energetic-500 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-inner">
              P
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold leading-none">PrimeVitality</h1>
              <p className="text-xs text-prime-200 uppercase tracking-widest">Age {profile.age} • {profile.location}</p>
            </div>
          </div>
          <button 
            onClick={onReset}
            className="text-sm text-prime-200 hover:text-white underline decoration-dotted underline-offset-4"
          >
            New Plan
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Welcome Hero */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-block p-3 bg-amber-100 rounded-full mb-4">
            <Award className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
            Your Journey Starts Now
          </h2>
          <p className="text-lg text-slate-600 italic border-l-4 border-energetic-500 pl-4 py-2 bg-white shadow-sm inline-block rounded-r-lg">
            "{plan.motivationalQuote}"
          </p>
        </section>

        {/* High Level Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Target</p>
                <p className="text-3xl font-serif font-bold text-prime-800">{plan.dailyCalories}</p>
                <p className="text-xs text-slate-400">Calories / Day</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Protein</p>
                <p className="text-3xl font-serif font-bold text-emerald-600">{plan.proteinTarget}g</p>
                <p className="text-xs text-slate-400">Muscle Maintenance</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Duration</p>
                <p className="text-3xl font-serif font-bold text-indigo-600">7</p>
                <p className="text-xs text-slate-400">Day Reset</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Goal</p>
                <p className="text-3xl font-serif font-bold text-rose-600">{profile.currentWeight - profile.targetWeight}</p>
                <p className="text-xs text-slate-400">Lbs to lose</p>
            </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                <button 
                    onClick={() => setActiveTab('PLAN')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'PLAN' ? 'bg-prime-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <Calendar className="w-5 h-5" />
                    <span>My Plan</span>
                </button>
                <button 
                    onClick={() => setActiveTab('LOCAL')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'LOCAL' ? 'bg-prime-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
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
                     <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 md:p-8">
                        <h3 className="text-xl font-serif font-bold text-indigo-900 mb-4">Plan Summary</h3>
                        <p className="text-indigo-800 leading-relaxed text-lg mb-6">{plan.summary}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg p-6 border border-indigo-100 shadow-sm">
                            <div>
                                <h4 className="flex items-center gap-2 font-bold text-emerald-700 mb-3">
                                    <Leaf className="w-5 h-5" /> Seasonal Fresh Picks
                                </h4>
                                <ul className="list-disc list-inside text-slate-600 space-y-1">
                                    {plan.seasonalProduce.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="flex items-center gap-2 font-bold text-amber-700 mb-3">
                                    <Wheat className="w-5 h-5" /> Power Nuts & Seeds
                                </h4>
                                <ul className="list-disc list-inside text-slate-600 space-y-1">
                                    {plan.recommendedNutsSeeds.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {plan.tips.map((tip, i) => (
                                <span key={i} className="px-3 py-1 bg-white text-indigo-600 text-sm font-bold rounded-full border border-indigo-200 shadow-sm">
                                    ★ {tip}
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