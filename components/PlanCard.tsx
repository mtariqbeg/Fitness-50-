import React from 'react';
import { DailyPlan } from '../types';
import { Utensils, Activity, Droplets, Sun, Moon, Coffee } from 'lucide-react';

interface PlanCardProps {
  dayPlan: DailyPlan;
  index: number;
}

export const PlanCard: React.FC<PlanCardProps> = ({ dayPlan, index }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-prime-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-prime-800 px-6 py-4 flex justify-between items-center">
        <h3 className="text-xl font-serif font-bold text-white">Day {index + 1}: {dayPlan.day}</h3>
        <Activity className="text-energetic-500 w-6 h-6" />
      </div>
      
      <div className="p-6 space-y-6">
        {/* Meals Section */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-50 rounded-lg shrink-0">
              <Coffee className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Breakfast</p>
              <p className="text-slate-700 font-medium">{dayPlan.breakfast}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-emerald-50 rounded-lg shrink-0">
              <Sun className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lunch</p>
              <p className="text-slate-700 font-medium">{dayPlan.lunch}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-indigo-50 rounded-lg shrink-0">
              <Utensils className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dinner</p>
              <p className="text-slate-700 font-medium">{dayPlan.dinner}</p>
            </div>
          </div>
          
           <div className="flex items-start gap-4">
            <div className="p-2 bg-rose-50 rounded-lg shrink-0">
              <Moon className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Snack</p>
              <p className="text-slate-700 font-medium">{dayPlan.snack}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Action Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-prime-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-prime-600" />
              <p className="text-sm font-bold text-prime-800">Movement</p>
            </div>
            <p className="text-sm text-slate-700">{dayPlan.exercise}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <p className="text-sm font-bold text-blue-800">Hydration</p>
            </div>
            <p className="text-sm text-slate-700">{dayPlan.hydrationGoal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
