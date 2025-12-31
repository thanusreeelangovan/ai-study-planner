
import React, { useState } from 'react';
import { Subject } from '../types';
import { Trash2, Plus, Calendar, BookOpen, AlertCircle } from 'lucide-react';

// Use standard lucide-react-like SVG components to avoid import issues if needed,
// but lucide-react is standard. Let's assume common icons.

interface SubjectFormProps {
  subjects: Subject[];
  onAdd: (subject: Subject) => void;
  onRemove: (id: string) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ subjects, onAdd, onRemove }) => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<Subject['difficulty']>('Medium');
  const [type, setType] = useState<Subject['type']>('Exam');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !deadline) return;

    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      name,
      difficulty,
      type,
      deadline
    });

    setName('');
    setDeadline('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Organic Chemistry"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deadline Date</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="Exam">Exam</option>
              <option value="Assignment">Assignment</option>
              <option value="General Study">General Study</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span> Add Subject
        </button>
      </form>

      <div className="space-y-3">
        {subjects.length === 0 ? (
          <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-slate-400">📝</span>
            </div>
            <p className="text-slate-500">No subjects added yet. Start by listing your courses or exams.</p>
          </div>
        ) : (
          subjects.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 group animate-fade-in shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4 items-center">
                <div className={`p-2 rounded-lg ${
                  sub.difficulty === 'Hard' ? 'bg-rose-50 text-rose-600' : 
                  sub.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  <span className="text-sm font-bold">{sub.difficulty[0]}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{sub.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="font-medium text-slate-600">{sub.type}</span> • Due {sub.deadline}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemove(sub.id)}
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <span className="text-lg">×</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubjectForm;
