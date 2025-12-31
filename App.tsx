
import React, { useState, useEffect } from 'react';
import { Subject, UserInput, StudyPlan } from './types';
import SubjectForm from './components/SubjectForm';
import PlanDisplay from './components/PlanDisplay';
import { generateStudyPlan } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'setup' | 'loading' | 'results'>('setup');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [dailyHours, setDailyHours] = useState<number>(4);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddSubject = (sub: Subject) => setSubjects([...subjects, sub]);
  const handleRemoveSubject = (id: string) => setSubjects(subjects.filter(s => s.id !== id));

  const handleGenerate = async () => {
    if (subjects.length === 0) {
      alert("Please add at least one subject first!");
      return;
    }

    setView('loading');
    setError(null);
    try {
      const generatedPlan = await generateStudyPlan({
        subjects,
        dailyHours,
        startDate,
        endDate
      });
      setPlan(generatedPlan);
      setView('results');
    } catch (err) {
      console.error(err);
      setError("Failed to generate plan. Please check your connection and API key.");
      setView('setup');
    }
  };

  const reset = () => {
    setView('setup');
    setPlan(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-slate-200/50 py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">L</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Lumina
            </h1>
          </div>
          {view === 'results' && (
            <button
              onClick={reset}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              ← Start Over
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12">
        {view === 'setup' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Intro & Subjects */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                  Ace your exams <br />
                  <span className="text-indigo-600">without the burnout.</span>
                </h2>
                <p className="text-lg text-slate-600">
                  Lumina creates a high-impact, balanced study schedule tailored to your courses and personal time constraints.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">1. List your subjects</h3>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    {subjects.length} Added
                  </span>
                </div>
                <SubjectForm
                  subjects={subjects}
                  onAdd={handleAddSubject}
                  onRemove={handleRemoveSubject}
                />
              </div>
            </div>

            {/* Config & Action */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 space-y-8">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    2. Setting your pace
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-700">Daily Study Hours</label>
                        <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded text-sm">{dailyHours}h</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        step="0.5"
                        value={dailyHours}
                        onChange={(e) => setDailyHours(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <p className="text-xs text-slate-400">Include breaks! We recommend 4-6 hours max.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan From</label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Until</label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-rose-700 text-sm">
                      <span className="mt-0.5">⚠️</span>
                      <p>{error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleGenerate}
                    disabled={subjects.length === 0}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                  >
                    <span>✨</span> Generate My Plan
                  </button>
                </div>

                <div className="p-6 bg-slate-900 rounded-3xl text-slate-400 text-sm leading-relaxed">
                  <p className="flex items-center gap-2 text-slate-100 font-medium mb-1">
                    <span className="text-indigo-400">✓</span> High-Impact Scheduling
                  </p>
                  <p className="mb-4">Our AI prioritizes based on difficulty and time left, using active recall patterns.</p>
                  <p className="flex items-center gap-2 text-slate-100 font-medium mb-1">
                    <span className="text-indigo-400">✓</span> Realistic Recovery
                  </p>
                  <p>Burnout happens when plans are rigid. Lumina builds in flexibility.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'loading' && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Architecting your success...</h2>
            <div className="max-w-md">
              <p className="text-slate-500 text-lg animate-pulse">
                Analyzing difficulty curves, prioritizing deadlines, and optimizing for cognitive focus.
              </p>
            </div>
            <div className="mt-12 space-y-2">
              <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Study Tip</p>
              <p className="text-slate-400 italic font-medium">"50 minutes of focused work is better than 5 hours of distracted scrolling."</p>
            </div>
          </div>
        )}

        {view === 'results' && plan && (
          <PlanDisplay plan={plan} />
        )}
      </main>

      {/* Footer Info */}
      <footer className="mt-20 border-t border-slate-200 py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            Powered by Gemini AI. Designed for students, by Lumina.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
