
import React from 'react';
import { StudyPlan } from '../types';

interface PlanDisplayProps {
  plan: StudyPlan;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan }) => {
  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Summary Card */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <span className="text-xl">🌟</span>
          </div>
          <h2 className="text-2xl font-bold">Your Success Blueprint</h2>
        </div>
        <p className="text-indigo-50 leading-relaxed text-lg italic">
          "{plan.summary}"
        </p>
      </section>

      {/* Priorities Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-slate-800">Critical Priorities</h2>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plan.priorities.map((priority, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Subject Focus</span>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{priority.subject}</h3>
              <p className="text-sm text-slate-600 mb-4 flex-grow">{priority.reason}</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase block mb-1">Strategy</span>
                <p className="text-sm font-medium text-slate-700">{priority.strategy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Schedule */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-slate-800">Your Action Plan</h2>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plan.schedule.map((day, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">{day.day}</h3>
                <span className="text-xs font-semibold px-2 py-1 bg-white rounded-md border border-slate-200 text-slate-400">
                  {day.sessions.length} Sessions
                </span>
              </div>
              <div className="p-6 space-y-4">
                {day.sessions.map((session, sIdx) => (
                  <div key={sIdx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                      <div className="w-px h-full bg-slate-200 my-1"></div>
                    </div>
                    <div className="pb-4">
                      <span className="text-xs font-bold text-slate-400 block mb-0.5">{session.time}</span>
                      <h4 className="font-bold text-slate-800">{session.subject}</h4>
                      <p className="text-sm text-slate-600 leading-snug">{session.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tips */}
      <section className="bg-amber-50 border border-amber-200 p-8 rounded-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center">
             <span className="text-xl">💡</span>
          </div>
          <h2 className="text-xl font-bold text-amber-900">Expert Productivity Tips</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.tips.map((tip, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              <p className="text-amber-800 text-sm font-medium">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlanDisplay;
