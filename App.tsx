import React, { useState } from 'react';
import { AppState, UserProfile, WeightLossPlan } from './types';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { generatePersonalizedPlan } from './services/geminiService';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.ONBOARDING);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<WeightLossPlan | null>(null);

  const handleOnboardingSubmit = async (userProfile: UserProfile) => {
    setProfile(userProfile);
    setAppState(AppState.GENERATING);
    
    try {
      const generatedPlan = await generatePersonalizedPlan(userProfile);
      setPlan(generatedPlan);
      setAppState(AppState.DASHBOARD);
    } catch (error) {
      console.error("Failed to generate plan", error);
      alert("We encountered an issue creating your plan. Please try again.");
      setAppState(AppState.ONBOARDING);
    }
  };

  const handleReset = () => {
    setProfile(null);
    setPlan(null);
    setAppState(AppState.ONBOARDING);
  };

  if (appState === AppState.GENERATING) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        {/* Background Image */}
         <img 
            src="https://images.unsplash.com/photo-1544367563-12123d815d19?auto=format&fit=crop&w=1920&q=80"
            alt="Wellness Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm scale-105 animate-pulse-slow" 
            style={{ animationDuration: '4s' }}
         />
         
        <div className="relative z-10 bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full border border-white/20">
          <div className="mb-6 p-4 bg-prime-50 rounded-full">
             <Loader2 className="w-10 h-10 text-energetic-500 animate-spin" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-prime-900 mb-3">Crafting Your Plan</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Analyzing metabolism data, selecting nutrient-rich foods tailored for age {profile?.age}, and finding safe, effective exercises...
          </p>
          <div className="mt-8 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
             <div className="h-full bg-prime-500 animate-loading-bar w-1/2 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (appState === AppState.DASHBOARD && plan && profile) {
    return <Dashboard plan={plan} profile={profile} onReset={handleReset} />;
  }

  return <Onboarding onSubmit={handleOnboardingSubmit} isLoading={false} />;
}