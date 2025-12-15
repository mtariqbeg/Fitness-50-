import React, { useState } from 'react';
import { Gender, UserProfile } from '../types';
import { ArrowRight, Loader2, MapPin, User, Activity, Heart } from 'lucide-react';

interface OnboardingProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    gender: Gender.FEMALE,
    activityLevel: 'Moderate'
  });

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    if (formData.age && formData.location && formData.currentWeight && formData.targetWeight) {
        onSubmit(formData as UserProfile);
    }
  };

  const isStepValid = () => {
      if (step === 1) return formData.age && formData.gender && formData.age >= 50;
      if (step === 2) return formData.currentWeight && formData.targetWeight && formData.location;
      if (step === 3) return true; 
      return false;
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 relative overflow-hidden">
       {/* Background Decorative Element */}
       <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 40 0 60 0 100 100 Z" fill="currentColor" className="text-prime-900" />
          </svg>
      </div>

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 grid md:grid-cols-2">
        
        {/* Left Side: Graphic & Inspiration */}
        <div className="hidden md:block relative bg-prime-900 h-full min-h-[600px]">
            <img 
                src="https://images.unsplash.com/photo-1552674605-469555942d76?auto=format&fit=crop&w=800&q=80" 
                alt="Active senior lifestyle" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-prime-900 via-prime-900/60 to-transparent" />
            
            <div className="relative z-10 p-12 h-full flex flex-col justify-end text-white">
                <div className="mb-6 p-3 bg-energetic-500/20 backdrop-blur-sm w-fit rounded-xl border border-energetic-500/30">
                    <Heart className="text-energetic-500 w-8 h-8" fill="currentColor" />
                </div>
                <h2 className="text-4xl font-serif font-bold mb-4 leading-tight">Embrace Your<br/>Best Years</h2>
                <p className="text-prime-100 text-lg font-light leading-relaxed">
                    Personalized wellness plans scientifically designed for the unique metabolism and lifestyle of the 50+ generation.
                </p>
                <div className="mt-8 flex gap-4 text-sm font-bold text-prime-200 uppercase tracking-widest">
                    <span>• Vitality</span>
                    <span>• Strength</span>
                    <span>• Balance</span>
                </div>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col relative">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 w-full">
                <div 
                    className="h-full bg-gradient-to-r from-energetic-500 to-energetic-600 transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                <div className="mb-8">
                    <h1 className="text-2xl font-serif font-bold text-prime-900 mb-2">PrimeVitality 50+</h1>
                    <p className="text-slate-500">Let's build your personalized roadmap.</p>
                </div>

                <div className="min-h-[300px]">
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <div className="p-2 bg-prime-100 rounded-lg text-prime-600"><User size={20} /></div>
                                About You
                            </h2>
                            
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Age (Must be 50+)</label>
                                <input 
                                    type="number" 
                                    min="50"
                                    max="110"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-prime-500 outline-none text-lg transition-shadow"
                                    placeholder="e.g. 62"
                                    value={formData.age || ''}
                                    onChange={e => handleChange('age', parseInt(e.target.value))}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {[Gender.FEMALE, Gender.MALE].map(g => (
                                        <button
                                            key={g}
                                            onClick={() => handleChange('gender', g)}
                                            className={`py-4 px-4 rounded-lg border-2 font-bold transition-all flex items-center justify-center gap-2 ${formData.gender === g ? 'border-prime-500 bg-prime-50 text-prime-800 shadow-inner' : 'border-slate-200 text-slate-500 hover:border-prime-300 hover:bg-slate-50'}`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <div className="p-2 bg-prime-100 rounded-lg text-prime-600"><Activity size={20} /></div>
                                Goals & Location
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Current Weight</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-prime-500 outline-none text-lg"
                                            placeholder="180"
                                            value={formData.currentWeight || ''}
                                            onChange={e => handleChange('currentWeight', parseInt(e.target.value))}
                                        />
                                        <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-bold">lbs</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Target Weight</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-prime-500 outline-none text-lg"
                                            placeholder="160"
                                            value={formData.targetWeight || ''}
                                            onChange={e => handleChange('targetWeight', parseInt(e.target.value))}
                                        />
                                        <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-bold">lbs</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">City & State</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                                    <input 
                                        type="text" 
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-prime-500 outline-none text-lg"
                                        placeholder="e.g. Sarasota, FL"
                                        value={formData.location || ''}
                                        onChange={e => handleChange('location', e.target.value)}
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">We use this to find fresh seasonal foods near you.</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <div className="p-2 bg-prime-100 rounded-lg text-prime-600"><Activity size={20} /></div>
                                Final Touches
                            </h2>
                            
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Activity Level</label>
                                <select 
                                    value={formData.activityLevel}
                                    onChange={e => handleChange('activityLevel', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-prime-500 outline-none bg-white text-lg"
                                >
                                    <option value="Sedentary">Sedentary (Little to no exercise)</option>
                                    <option value="Light">Light (Walking, Gardening)</option>
                                    <option value="Moderate">Moderate (Exercise 3-4x/week)</option>
                                    <option value="Active">Active (Daily exercise)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Health Notes (Optional)</label>
                                <textarea 
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-prime-500 outline-none resize-none"
                                    rows={3}
                                    placeholder="e.g. Knee pain, High blood pressure, Diabetes type 2..."
                                    value={formData.healthConditions || ''}
                                    onChange={e => handleChange('healthConditions', e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
                    {step > 1 ? (
                        <button 
                            onClick={() => setStep(step - 1)}
                            className="text-slate-500 font-bold hover:text-prime-600 px-4 py-2 transition-colors"
                        >
                            Back
                        </button>
                    ) : <div></div>}

                    <button
                        onClick={handleNext}
                        disabled={!isStepValid() || isLoading}
                        className="bg-energetic-500 hover:bg-energetic-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-energetic-500/30 hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : (
                            <>
                                {step === 3 ? 'Generate Plan' : 'Next Step'} 
                                {step !== 3 && <ArrowRight size={20} />}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};