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
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-prime-200 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-energetic-500 animate-spin mb-4" />
            <h2 className="text-2xl font-serif font-bold text-prime-900 mb-2">Crafting Your Plan</h2>
            <p className="text-slate-500 max-w-sm">
              Analyzing metabolism data, selecting nutrient-rich foods tailored for age {profile?.age}, and finding safe exercises...
            </p>
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
