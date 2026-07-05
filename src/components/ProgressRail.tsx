import { PlaneTakeoff } from 'lucide-react';
import { motion } from 'motion/react';

const STEPS = ['Qualification', 'Destination', 'Skill Check', 'Flight Notes', 'Boarding Pass'];

export default function ProgressRail({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1">
      {STEPS.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'pending';
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div
                className={[
                  'flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] transition-colors duration-300',
                  state === 'done' && 'border-signal-500 bg-signal-500/15 text-signal-500',
                  state === 'active' && 'border-beacon-500 bg-beacon-500/15 text-beacon-400',
                  state === 'pending' && 'border-tarmac-600 text-tarmac-400',
                ].filter(Boolean).join(' ')}
              >
                {state === 'active' ? <PlaneTakeoff size={13} /> : i + 1}
              </div>
              <span
                className={[
                  'hidden font-mono text-[11px] uppercase tracking-widest sm:inline',
                  state === 'pending' ? 'text-tarmac-400' : 'text-tarmac-200',
                ].join(' ')}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="relative h-px w-6 sm:w-10 bg-tarmac-700 overflow-hidden">
                {state === 'done' && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-signal-500"
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
