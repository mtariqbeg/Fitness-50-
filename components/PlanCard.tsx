import React from 'react';
import { DailyPlan } from '../types';
import { Utensils, Activity, Droplets, Sun, Moon, Coffee } from 'lucide-react';

interface PlanCardProps {
  dayPlan: DailyPlan;
  index: number;
}

export const PlanCard: React.FC<PlanCardProps> = ({ dayPlan, index }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="bg-gradient-to-r from-prime-800 to-prime-600 px-6 py-4 flex justify-between items-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors" />
        <div className="absolute left-0 top-0 w-full h-full bg-noise opacity-10" />

        <h3 className="text-xl font-serif font-bold text-white relative z-10">Day {index + 1}: {dayPlan.day}</h3>
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm relative z-10">
            <Activity className="text-white w-5 h-5" />
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Meals Section */}
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="p-2 bg-amber-50 rounded-lg shrink-0 border border-amber-100">
              <Coffee className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Breakfast</p>
              <p className="text-slate-700 font-medium leading-tight">{dayPlan.breakfast}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="p-2 bg-emerald-50 rounded-lg shrink-0 border border-emerald-100">
              <Sun className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Lunch</p>
              <p className="text-slate-700 font-medium leading-tight">{dayPlan.lunch}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="p-2 bg-indigo-50 rounded-lg shrink-0 border border-indigo-100">
              <Utensils className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Dinner</p>
              <p className="text-slate-700 font-medium leading-tight">{dayPlan.dinner}</p>
            </div>
          </div>
          
           <div className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="p-2 bg-rose-50 rounded-lg shrink-0 border border-rose-100">
              <Moon className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Snack</p>
              <p className="text-slate-700 font-medium leading-tight">{dayPlan.snack}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Action Section */}
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-prime-50 p-4 rounded-xl border border-prime-100">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-prime-600" />
              <p className="text-xs font-bold text-prime-800 uppercase tracking-wide">Movement</p>
            </div>
            <p className="text-sm text-slate-700 font-medium">{dayPlan.exercise}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wide">Hydration</p>
            </div>
            <p className="text-sm text-slate-700 font-medium">{dayPlan.hydrationGoal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};