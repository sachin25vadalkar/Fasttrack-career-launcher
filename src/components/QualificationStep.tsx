import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { QUALIFICATIONS, type Qualification } from '../data/careerData';

interface Props {
  onSelect: (q: Qualification) => void;
}

export default function QualificationStep({ onSelect }: Props) {
  return (
    <div className="flip-cell">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-beacon-400">Gate 01 — Departure Profile</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-runway-50">
        What did you graduate in?
      </h2>
      <p className="mt-2 max-w-xl text-sm text-tarmac-400">
        Pick the qualification closest to yours. Every path below is mapped against real hiring signals for the
        Indian and global markets.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {QUALIFICATIONS.map((q, i) => (
          <motion.button
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            onClick={() => onSelect(q)}
            className="group flex items-start gap-3 rounded-lg border border-tarmac-700 bg-tarmac-900/60 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-beacon-500 hover:bg-tarmac-800"
          >
            <GraduationCap size={18} className="mt-0.5 shrink-0 text-tarmac-400 transition-colors group-hover:text-beacon-400" />
            <div>
              <div className="font-medium text-runway-50">{q.label}</div>
              <div className="text-xs text-tarmac-400">{q.fullForm}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-signal-500">{q.category}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
