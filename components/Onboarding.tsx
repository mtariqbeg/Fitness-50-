import React, { useState } from 'react';
import { Gender, UserProfile } from '../types';
import { ArrowRight, Loader2, MapPin, User, Activity } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
            <div 
                className="h-full bg-energetic-500 transition-all duration-500 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
            />
        </div>

        <div className="p-8 md:p-12">
            <h1 className="text-3xl font-serif font-bold text-prime-900 mb-2">PrimeVitality 50+</h1>
            <p className="text-slate-500 mb-8">Reclaim your energy. Personalized for your golden years.</p>

            <div className="min-h-[300px]">
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <User className="text-prime-600" /> About You
                        </h2>
                        
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Age (Must be 50+)</label>
                            <input 
                                type="number" 
                                min="50"
                                max="110"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-prime-500 outline-none text-lg"
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
                                        className={`py-3 px-4 rounded-lg border-2 font-bold transition-all ${formData.gender === g ? 'border-prime-600 bg-prime-50 text-prime-800' : 'border-slate-200 text-slate-500 hover:border-prime-300'}`}
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
                            <Activity className="text-prime-600" /> Goals & Location
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Current Weight (lbs)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-prime-500 outline-none text-lg"
                                    placeholder="e.g. 180"
                                    value={formData.currentWeight || ''}
                                    onChange={e => handleChange('currentWeight', parseInt(e.target.value))}
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Target Weight (lbs)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-prime-500 outline-none text-lg"
                                    placeholder="e.g. 160"
                                    value={formData.targetWeight || ''}
                                    onChange={e => handleChange('targetWeight', parseInt(e.target.value))}
                                />
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
                            <p className="text-xs text-slate-400 mt-2">We use this to find local foods and resources.</p>
                        </div>
                    </div>
                )}

                 {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Activity className="text-prime-600" /> Final Touches
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

            <div className="flex justify-between items-center mt-8">
                {step > 1 ? (
                    <button 
                        onClick={() => setStep(step - 1)}
                        className="text-slate-500 font-bold hover:text-prime-600 px-4"
                    >
                        Back
                    </button>
                ) : <div></div>}

                <button
                    onClick={handleNext}
                    disabled={!isStepValid() || isLoading}
                    className="bg-energetic-500 hover:bg-energetic-600 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : (
                        <>
                            {step === 3 ? 'Generate Plan' : 'Next'} 
                            {step !== 3 && <ArrowRight size={20} />}
                        </>
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
