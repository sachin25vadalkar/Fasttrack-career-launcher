import { useState } from 'react';
import { ArrowLeft, Rocket } from 'lucide-react';

interface Props {
  onSubmit: (experienceNotes: string, additionalGoals: string) => void;
  onBack: () => void;
  submitting: boolean;
}

export default function DetailsStep({ onSubmit, onBack, submitting }: Props) {
  const [experienceNotes, setExperienceNotes] = useState('');
  const [additionalGoals, setAdditionalGoals] = useState('');

  return (
    <div className="flip-cell">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-tarmac-400 transition-colors hover:text-beacon-400"
      >
        <ArrowLeft size={13} /> Recheck skills
      </button>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-beacon-400">Gate 04 — Flight Notes</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-runway-50">
        Anything else your report should know?
      </h2>
      <p className="mt-2 max-w-xl text-sm text-tarmac-400">Optional, but the more context, the sharper the plan.</p>

      <div className="mt-8 flex flex-col gap-5">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-tarmac-400">
            Background & experience notes
          </span>
          <textarea
            value={experienceNotes}
            onChange={(e) => setExperienceNotes(e.target.value)}
            rows={4}
            placeholder="e.g. Built a college project on X, interned briefly at a startup, self-taught Y..."
            className="mt-2 w-full resize-none rounded-lg border border-tarmac-700 bg-tarmac-900/60 p-3.5 text-sm text-runway-50 placeholder:text-tarmac-600 outline-none transition-colors focus:border-beacon-500"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-tarmac-400">
            Additional goals
          </span>
          <textarea
            value={additionalGoals}
            onChange={(e) => setAdditionalGoals(e.target.value)}
            rows={3}
            placeholder="e.g. Want to relocate to Germany within 2 years, targeting remote-first companies..."
            className="mt-2 w-full resize-none rounded-lg border border-tarmac-700 bg-tarmac-900/60 p-3.5 text-sm text-runway-50 placeholder:text-tarmac-600 outline-none transition-colors focus:border-beacon-500"
          />
        </label>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          disabled={submitting}
          onClick={() => onSubmit(experienceNotes, additionalGoals)}
          className="flex items-center gap-2 rounded-full bg-beacon-500 px-6 py-2.5 font-medium text-tarmac-950 transition-all hover:bg-beacon-400 hover:shadow-lg hover:shadow-beacon-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Rocket size={16} />
          {submitting ? 'Launching…' : 'Generate my report'}
        </button>
      </div>
    </div>
  );
}
