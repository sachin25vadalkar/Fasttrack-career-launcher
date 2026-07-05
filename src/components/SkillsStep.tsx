import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check } from 'lucide-react';
import type { CareerPath } from '../data/careerData';

interface Props {
  path: CareerPath;
  onContinue: (haveSkills: string[], gapSkills: string[]) => void;
  onBack: () => void;
}

export default function SkillsStep({ path, onContinue, onBack }: Props) {
  const [have, setHave] = useState<Set<string>>(new Set());

  const toggle = (skill: string) => {
    setHave((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) next.delete(skill);
      else next.add(skill);
      return next;
    });
  };

  const gaps = path.skills.filter((s) => !have.has(s));

  return (
    <div className="flip-cell">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-tarmac-400 transition-colors hover:text-beacon-400"
      >
        <ArrowLeft size={13} /> Change destination
      </button>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-beacon-400">Gate 03 — Skill Check</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-runway-50">
        Which of these do you already have?
      </h2>
      <p className="mt-2 max-w-xl text-sm text-tarmac-400">
        Tap what applies to <span className="text-runway-50">{path.title}</span>. Everything left unchecked becomes
        your gap-bridging plan.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {path.skills.map((skill, i) => {
          const checked = have.has(skill);
          return (
            <motion.button
              key={skill}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => toggle(skill)}
              className={[
                'flex items-center gap-3 rounded-lg border p-3.5 text-left text-sm transition-all',
                checked
                  ? 'border-signal-500 bg-signal-500/10 text-runway-50'
                  : 'border-tarmac-700 bg-tarmac-900/60 text-tarmac-200 hover:border-tarmac-600',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                  checked ? 'border-signal-500 bg-signal-500 text-tarmac-950' : 'border-tarmac-600',
                ].join(' ')}
              >
                {checked && <Check size={13} strokeWidth={3} />}
              </span>
              {skill}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-tarmac-400">
          {have.size} secured · {gaps.length} to bridge
        </p>
        <button
          onClick={() => onContinue(Array.from(have), gaps)}
          className="rounded-full bg-beacon-500 px-6 py-2.5 font-medium text-tarmac-950 transition-all hover:bg-beacon-400 hover:shadow-lg hover:shadow-beacon-500/20"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
