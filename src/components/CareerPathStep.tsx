import { motion } from 'motion/react';
import { Compass, ArrowLeft } from 'lucide-react';
import type { CareerPath, Qualification } from '../data/careerData';

interface Props {
  qualification: Qualification;
  onSelect: (path: CareerPath) => void;
  onBack: () => void;
}

export default function CareerPathStep({ qualification, onSelect, onBack }: Props) {
  return (
    <div className="flip-cell">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-tarmac-400 transition-colors hover:text-beacon-400"
      >
        <ArrowLeft size={13} /> Change qualification
      </button>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-beacon-400">Gate 02 — Destination</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-runway-50">
        Choose a career path to chart
      </h2>
      <p className="mt-2 max-w-xl text-sm text-tarmac-400">
        Based on your <span className="text-runway-50">{qualification.label}</span>, here are destinations with
        strong demand right now.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {qualification.paths.map((p, i) => (
          <motion.button
            key={p.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            onClick={() => onSelect(p)}
            className="group flex items-center justify-between gap-4 rounded-lg border border-tarmac-700 bg-tarmac-900/60 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-beacon-500 hover:bg-tarmac-800"
          >
            <div>
              <div className="font-[family-name:var(--font-display)] text-lg text-runway-50">{p.title}</div>
              <div className="text-xs text-tarmac-400">{p.tagline}</div>
            </div>
            <Compass size={20} className="shrink-0 text-tarmac-400 transition-transform group-hover:rotate-45 group-hover:text-beacon-400" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
