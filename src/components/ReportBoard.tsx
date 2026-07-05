import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { AlertTriangle, RefreshCw, TicketCheck } from 'lucide-react';

interface Props {
  status: 'loading' | 'error' | 'success';
  report: string | null;
  error: string | null;
  careerPathTitle: string;
  onRestart: () => void;
  onRetry: () => void;
}

function LoadingSkeleton() {
  const widths = ['85%', '95%', '70%', '90%', '60%', '80%'];
  return (
    <div className="space-y-3">
      <p className="font-mono text-xs uppercase tracking-widest text-beacon-400 animate-pulse">
        Compiling your boarding pass…
      </p>
      {widths.map((w, i) => (
        <div key={i} className="h-3 rounded bg-tarmac-800 animate-pulse" style={{ width: w }} />
      ))}
    </div>
  );
}

export default function ReportBoard({ status, report, error, careerPathTitle, onRestart, onRetry }: Props) {
  return (
    <div className="flip-cell">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-beacon-400">Gate 05 — Boarding Pass</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-runway-50">
        Your route to {careerPathTitle}
      </h2>

      <div className="mt-8 rounded-xl border border-tarmac-700 bg-tarmac-900/60 p-5 sm:p-7">
        {status === 'loading' && <LoadingSkeleton />}

        {status === 'error' && (
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-beacon-400">
              <AlertTriangle size={18} />
              <span className="font-medium">The report couldn't take off</span>
            </div>
            <p className="text-sm text-tarmac-400">{error}</p>
            <button
              onClick={onRetry}
              className="flex items-center gap-2 rounded-full border border-tarmac-600 px-5 py-2 text-sm text-runway-50 transition-colors hover:border-beacon-500"
            >
              <RefreshCw size={14} /> Try again
            </button>
          </div>
        )}

        {status === 'success' && report && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="mb-5 flex items-center gap-2 text-signal-500">
              <TicketCheck size={18} />
              <span className="font-mono text-xs uppercase tracking-widest">Report generated</span>
            </div>
            <div className="prose-report">
              <ReactMarkdown>{report}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onRestart}
          className="font-mono text-[11px] uppercase tracking-widest text-tarmac-400 transition-colors hover:text-beacon-400"
        >
          Start a new journey
        </button>
      </div>
    </div>
  );
}
